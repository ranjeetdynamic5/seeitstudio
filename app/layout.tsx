import type { Metadata } from "next";
import CartToast from "./components/CartToast";

import "./globals.css";



export const metadata: Metadata = {
  title: "SeeIt Studio — Software, Training & Creative Services",
  description:
    "UK-based digital studio offering SketchUp extensions, rendering software, AI tools, professional training, and creative services for design professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-white text-[#0B0F19]">
        {children}
        <CartToast />
      </body>
    </html>
  );
}