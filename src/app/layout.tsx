import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "smallbusinesslandingpages.com — One-page websites from $399";
const description =
  "Simple one-page websites for local businesses. Design and build from $399, plus domain launch setup. No confusing packages or ranking guarantees.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "smallbusinesslandingpages.com",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "smallbusinesslandingpages.com — professional websites from $399",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth overflow-x-clip antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip font-sans">
        {children}
      </body>
    </html>
  );
}
