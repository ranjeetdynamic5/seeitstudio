import type { Metadata } from "next";
import CartToast from "@/components/CartToast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seeitstudio.com"),
  title: {
    default: "Seeit Studio — SketchUp Software, Training & Creative Services UK",
    template: "%s | Seeit Studio",
  },
  description:
    "UK-based digital studio offering SketchUp extensions, rendering software, AI tools, professional training, and creative services for architects and design professionals.",
  keywords: [
    "SketchUp training UK",
    "SketchUp extensions",
    "architectural rendering",
    "3D modelling UK",
    "rendering software",
    "AI consulting design",
    "web development architects",
    "V-Ray training",
    "Enscape training",
    "design software UK",
  ],
  authors: [{ name: "Seeit Studio", url: "https://seeitstudio.com" }],
  creator: "Seeit Studio",
  publisher: "Seeit Studio",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://seeitstudio.com",
    siteName: "Seeit Studio",
    title: "Seeit Studio — SketchUp Software, Training & Creative Services UK",
    description:
      "UK-based digital studio offering SketchUp extensions, rendering software, AI tools, professional training, and creative services for architects and design professionals.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Seeit Studio — Design Software & Training UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seeit Studio — SketchUp Software, Training & Creative Services UK",
    description:
      "UK-based digital studio offering SketchUp extensions, rendering software, AI tools, professional training, and creative services for architects and design professionals.",
    images: ["/og-image.jpg"],
    creator: "@SeeIt3D",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://seeitstudio.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-white text-[#092145]">
        {children}
        <CartToast />
      </body>
    </html>
  );
}