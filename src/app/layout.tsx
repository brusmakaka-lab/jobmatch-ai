import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "JobMatch AI - AI Career Matching Platform",
    template: "%s | JobMatch AI",
  },
  description:
    "Analyze job offers against your resume, surface skill gaps, generate tailored cover letters, and track every application from saved to offer.",
  applicationName: "JobMatch AI",
  keywords: [
    "AI resume matching",
    "job application tracker",
    "cover letter generator",
    "career SaaS",
    "Next.js portfolio project",
  ],
  authors: [{ name: "JobMatch AI" }],
  creator: "JobMatch AI",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "JobMatch AI - AI Career Matching Platform",
    description:
      "A polished SaaS portfolio demo for resume-job matching, AI cover letters, and application tracking.",
    url: siteUrl,
    siteName: "JobMatch AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobMatch AI - AI Career Matching Platform",
    description:
      "Analyze job offers, uncover gaps, generate cover letters, and track applications in one AI career workspace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

