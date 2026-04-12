# Luma Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

A modern AI-powered image generation SaaS platform built with Next.js and TypeScript. Transform your images into stunning artworks with AI, manage subscriptions, and track your creative journey.

## ✨ Features

- 🎨 **AI Image Transformation**: Convert images into 6 distinct artistic styles using advanced AI
- 📂 **Instant Upload & Generation**: Seamless image upload with real-time AI processing
- 🔐 **Secure Authentication**: Integrated with Clerk for Google and GitHub login
- 💳 **Subscription Management**: Flexible monthly plans (Free, Pro, Studio) with Stripe integration
- 📊 **Usage Dashboard**: Track remaining generations and monitor your activity
- 🗂️ **Image History**: Browse and manage all your previously generated images
- 🧠 **OpenAI Integration**: Powered by cutting-edge OpenAI models for high-quality results
- 🗄️ **PostgreSQL Database**: Robust data storage with Neon for scalability
- 🧩 **Type-Safe Queries**: Drizzle ORM for reliable, type-safe database operations
- 🚨 **Monitoring & Analytics**: Sentry for error tracking, performance monitoring, and insights
- 🎨 **Premium UI/UX**: 3D landing page design with modern SaaS aesthetics
- ⚡ **High-Performance Architecture**: Optimized for speed, security, and scalability

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Motion (animations)
- **Authentication**: Clerk
- **Payments**: Stripe (subscription management)
- **AI**: OpenAI API
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Image Handling**: ImageKit
- **Monitoring**: Sentry
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js 18+ (LTS recommended)
- npm, yarn, pnpm, or bun
- PostgreSQL database (we recommend Neon for cloud hosting)
- Accounts for:
  - [Clerk](https://clerk.com/) (authentication)
  - [Stripe](https://stripe.com/) (payments)
  - [OpenAI](https://openai.com/) (AI generation)
  - [ImageKit](https://imagekit.io/) (image management)
  - [Sentry](https://sentry.io/) (monitoring)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luma-studio.git
   cd luma-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Copy the `.env` file and fill in your API keys:

   ```bash
   cp .env .env.local
   ```

   Required environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
   - `CLERK_SECRET_KEY`: Clerk secret key
   - `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`: ImageKit public key
   - `IMAGEKIT_PRIVATE_KEY`: ImageKit private key
   - `SENTRY_AUTH_TOKEN`: Sentry auth token
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `STRIPE_SECRET_KEY`: Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key

4. **Set up the database**

   Run database migrations (assuming Drizzle is configured):

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

1. **Sign Up/Login**: Use Google or GitHub to authenticate
2. **Choose a Plan**: Select from Free, Pro, or Studio subscriptions
3. **Upload Images**: Drag and drop or select images to transform
4. **Generate**: Choose from 6 AI styles and generate your artwork
5. **Manage History**: View and download your generated images
6. **Monitor Usage**: Check your dashboard for generation limits and billing

## 🏗️ Project Structure

```
luma-studio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── studio/            # Main application pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── ...               # Feature components
├── lib/                  # Utility functions and configs
├── public/               # Static assets
└── ...                   # Config files
```

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact our support team.

---

Built with ❤️ using Next.js and TypeScript
