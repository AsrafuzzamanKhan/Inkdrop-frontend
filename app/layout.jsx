import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "INKDROP STUDIO — Custom DTF T-Shirts, Bangladesh",
  description:
    "Design your own custom T-shirt with premium DTF printing. Pick a blank shirt, upload your artwork, and we deliver anywhere in Bangladesh — pay a small advance now, the rest on delivery.",
};

// themeColor lives in `viewport`, not `metadata`, since Next 14+.
export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      {/* suppressHydrationWarning: browser extensions (ColorZilla, Grammarly, etc.)
          inject attributes like cz-shortcut-listen into <body> before React
          hydrates — a false-positive mismatch, not an app bug. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
