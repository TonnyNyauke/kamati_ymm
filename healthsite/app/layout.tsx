import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://afyabest.vercel.app/"),

  title: {
    default: "AfyaBest - Reverse Diabetes, Pressure & Obesity Naturally",
    template: '%s | AfyaBest - Reverse Diabetes, Pressure & Obesity Naturally'
  },
  description: "Discover AfyaBest's holistic approach to reversing diabetes, high blood pressure, and obesity. Empower yourself with science-backed resources for lasting health and well-being.",
  openGraph: {
    title: "AfyaBest - Reverse Diabetes, Pressure & Obesity Naturally",
    description: "Discover AfyaBest's holistic approach to reversing diabetes, high blood pressure, and obesity. Empower yourself with science-backed resources for lasting health and well-being.",
    type: "website",
    locale: "en_US",
    url: "https://afyabest.vercel.app/",
    siteName: "AfyaBest",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <Analytics />
      </body>
    </html>
  );
}
