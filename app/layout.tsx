import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tutorial-to-Skill Free Pack",
  description: "Two free OpenClaw/Codex skills with source notes, proof cards, and runtime smoke-test receipts.",
  openGraph: {
    title: "Tutorial-to-Skill Free Pack",
    description: "Plain-text OpenClaw/Codex skills adapted from public AI workflow tutorials.",
    url: siteUrl,
    siteName: "Tutorial-to-Skill Free Pack",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutorial-to-Skill Free Pack",
    description: "Free proof-card pack for OpenClaw/Codex skills."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

