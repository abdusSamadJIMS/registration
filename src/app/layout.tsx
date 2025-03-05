import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HydrationZustand from "./components/hydration-zustand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Registration | 3rd All India Level Wise Gymnastics Competition",
  description: "3rd All India Level Wise Gymnastics Competition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      theme-data="corporate"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HydrationZustand>
          {children}
        </HydrationZustand>
      </body>
    </html>
  );
}
