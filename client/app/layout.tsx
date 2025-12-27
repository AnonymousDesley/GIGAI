import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Import specifically requested fonts
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "GIGAI | GitHub Idea Generator",
  description: "AI-powered developer project ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-text-main font-sans selection:bg-primary selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
