import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "🛠️ Toolkit - JSON Formatter, JWT Decoder & More",
  description:
    "A collection of powerful online developer tools for JSON, JWT, QR codes, Base64, UUIDs, and more. Fast, secure, and privacy-friendly.",
  openGraph: {
    title: "🛠️ Toolkit - JSON Formatter, JWT Decoder & More",
    description:
      "A collection of powerful online developer tools for JSON, JWT, QR codes, Base64, UUIDs, and more.",
    url: "https://shashi.dev/toolkit",
    siteName: "Toolkit",
    images: [
      {
        url: "https://shashi.dev/toolkit/og-image.png", // Update with your actual image URL
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🛠️ Toolkit - JSON Formatter, JWT Decoder & More",
    description:
      "A collection of powerful online developer tools for JSON, JWT, QR codes, Base64, UUIDs, and more.",
    images: ["https://shashi.dev/toolkit/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
