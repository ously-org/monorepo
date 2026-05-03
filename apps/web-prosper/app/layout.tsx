import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ProsperLayout } from "../components/ProsperLayout";
import { LayoutDashboard, Users, Settings, LogOut, PieChart, Sparkles } from "lucide-react";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prosper",
  description: "Ously monorepo prosper app",
};

const mockNavGroups = [
  {
    label: "Platform",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      { title: "Campaigns", href: "/campaigns", icon: Sparkles },
      { title: "Analytics", href: "/analytics", icon: PieChart },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Team", href: "/team", icon: Users },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

const mockFooterNav = [{ title: "Logout", href: "/logout", icon: LogOut }];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <body className={cn(inter.className, "theme-prosper")}>
        <ProsperLayout navGroups={mockNavGroups} footerNav={mockFooterNav}>
          {children}
        </ProsperLayout>
      </body>
    </html>
  );
}
