import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ously",
  description: "Ously monorepo main app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-mono", jetbrainsMono.variable, inter.variable)}
    >
      <body className="theme-ously">{children}</body>
    </html>
  );
}

// TODO(ISSUE-125): Implement Global Auth Provider
// TODO(ISSUE-127): Implement root loading.tsx and error.tsx
