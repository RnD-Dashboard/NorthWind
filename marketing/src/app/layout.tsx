import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./effects.css";
import "./site.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lasso: AI candidate sourcing and outreach",
  description: "Describe the hire. Lasso finds and scores the people worth talking to, then helps you reach out from your own inbox.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-canvas text-foreground">{children}</body>
    </html>
  );
}
