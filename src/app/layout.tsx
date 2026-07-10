import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import StartScreen from "@/components/StartScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kungumapriyaa M | AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Kungumapriyaa M, AI/ML Engineer and Full-Stack Developer building intelligent systems, from GNN-based misinformation detection to full-stack platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <StartScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
