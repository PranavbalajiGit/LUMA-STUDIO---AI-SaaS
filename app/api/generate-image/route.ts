import { countGenerationsSince, createGeneration, utcMonthStart } from "@/db/generations";
import { getMonthlyGenerationLimit } from "@/lib/generations-quota";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

import * as Sentry from "@sentry/nextjs";
import { openaiProvider } from "@/lib/openai";
import { ACCEPTED_SOURCE_IMAGE_MIME_TYPES } from "@/lib/constants";
import { getStylePreset } from "@/lib/style-presets";

import { APICallError, generateImage, NoImageGeneratedError } from "ai";
import { uploadBufferToImageKit } from "@/lib/imagekit";


export const runtime = "nodejs";

type EditImageSize = "1024x1024" | "1536x1024" | "1024x1536";

type GenerateImageRequest = {
  sourceImageUrl?: string;
  sourceMimeType?: string;
  originalFileName?: string;
  styleSlug?: string;
  model?: string;
};


/**
 * inferImageSize reads width and height from the uploaded image (via sharp), computes aspect ratio,
 * and returns one of the allowed `size` values for OpenAI image edits.
 */
async function inferImageSize(imageBuffer: Buffer): Promise<EditImageSize> {
  try {
    const metadata = await sharp(imageBuffer).metadata();

    if (!metadata.width || !metadata.height) {
      return "1024x1024";
    }

    const aspectRatio = metadata.width / metadata.height;

    if (aspectRatio > 1.08) return "1536x1024"; // this means that the input image is wider than it is tall
    if (aspectRatio < 0.92) return "1024x1536"; // this means that the input image is taller than it is wide
    return "1024x1024"; // this means that the input image is square
  } catch {
    return "1024x1024";
  }
}

export async function POST(request: Request) {
    const { userId, has } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const monthlyLimit = getMonthlyGenerationLimit(has);
    const usedThisMonth = await countGenerationsSince(userId, utcMonthStart());

    if (usedThisMonth >= monthlyLimit) {
        Sentry.logger.warn("generation.quota_exceeded", {
        limit: monthlyLimit,
        used: usedThisMonth,
    });

    return NextResponse.json(
    {
        error: `Monthly generation limit reached (${monthlyLimit} images). Upgrade your plan or try again next month.`,
        code: "QUOTA_EXCEEDED" as const,
        limit: monthlyLimit,
        used: usedThisMonth,
    },
      { status: 429 },
    );
  }

  if (!openaiProvider) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY." }, { status: 500 });
  }

  const body = (await request.json()) as GenerateImageRequest;

  const { model, originalFileName, sourceImageUrl, sourceMimeType, styleSlug } = body;

  if (!sourceImageUrl) {
    return NextResponse.json({ error: "Please upload an image first." }, { status: 400 });
  }

  if (typeof sourceMimeType !== "string" || !ACCEPTED_SOURCE_IMAGE_MIME_TYPES.has(sourceMimeType)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, and WEBP files are supported." },
      { status: 400 },
    );
  }

  if (typeof styleSlug !== "string") {
    return NextResponse.json({ error: "Please choose a style." }, { status: 400 });
  }

  if (!model) {
    return NextResponse.json({ error: "Please choose a model." }, { status: 400 });
  }

  const preset = getStylePreset(styleSlug);
  if (!preset) {
    return NextResponse.json({ error: "Unknown style preset." }, { status: 400 });
  }

  const imageResponse = await fetch(sourceImageUrl);
  if (!imageResponse.ok) {
    return NextResponse.json(
      { error: "Could not fetch the uploaded source image." },
      { status: 404 },
    );
  }

  const prompt = [
    preset.prompt,
    "Do not add extra people, extra limbs, duplicate subjects, or change the overall camera angle.",
  ].join("\n\n");

  

}