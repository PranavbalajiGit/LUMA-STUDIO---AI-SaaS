import { Button } from "@/components/ui/button";
import { listUserGenerationSummaries } from "@/db/generations";
import { getGenerationQuotaSnapshot, MONTHLY_GENERATION_LIMITS } from "@/lib/generations-quota";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function StudioPage() {
  const { userId, has } = await auth();
  const initialHistory = userId ? await listUserGenerationSummaries(userId) : [];

  const initialQuota =
    userId != null
      ? await getGenerationQuotaSnapshot(has, userId)
      : {
          limit: MONTHLY_GENERATION_LIMITS.free,
          used: 0,
          remaining: MONTHLY_GENERATION_LIMITS.free,
        };

  return (
    <div>StudioPage</div>
  )
}

export default StudioPage