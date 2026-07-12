import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import StartScreen from "@/components/StartScreen";
import { profile, keywords } from "@/data/portfolio";
import "./globals.css";

const SITE_URL = "https://kungumapriyaa.netlify.app";

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

const TITLE = "Kungumapriyaa M | AI/ML Engineer & Full-Stack Developer";
const DESCRIPTION =
  "Kungumapriyaa M is an AI/ML Engineer and Full-Stack Developer based in Coimbatore, India, building intelligent systems — from graph neural networks and computer vision to full-stack web platforms.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Kungumapriyaa M",
  },
  description: DESCRIPTION,
  keywords,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/images/pfp.jpg`,
  jobTitle: ["AI/ML Engineer", "Full-Stack Developer"],
  description: profile.bio,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sri Eshwar College of Engineering",
  },
  knowsAbout: keywords,
  sameAs: [
    profile.github,
    profile.linkedin,
    "https://leetcode.com/u/KungumapriyaaMKP/",
    "https://www.geeksforgeeks.org/user/kungumaprhukh/",
    "https://www.hackerrank.com/profile/kungumapriyaamk1",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${profile.name} — Portfolio`,
  url: SITE_URL,
  description: DESCRIPTION,
  author: { "@type": "Person", name: profile.name },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <StartScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
