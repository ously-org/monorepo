import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ProsperLayout } from "../layout/ProsperLayout";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prosper",
  description: "Ously monorepo prosper app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <body className={cn(inter.className, "theme-prosper")}>
        <ProsperLayout>{children}</ProsperLayout>
      </body>
    </html>
  );
}

// TODO(ISSUE-125): Implement Global Auth Provider
// TODO(ISSUE-127): Implement root loading.tsx and error.tsx
