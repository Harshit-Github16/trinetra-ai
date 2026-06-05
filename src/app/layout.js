import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Trinetra AI | Enterprise Brand Protection & Threat Intelligence Platform",
  description: "Protect your brand across the digital ecosystem. Real-time AI-powered monitoring of phishing websites, fake domains, data leaks, social impersonation, and dark web threat intelligence.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020205] text-[#f3f4f6]">{children}</body>
    </html>
  );
}
