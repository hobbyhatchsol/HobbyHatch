import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const title = "HobbyHatch — The Protocol for the Hobby Economy";
const description =
  "A Solana-native protocol for creating tokenized hobby communities. Launch community-owned ecosystems, mint tokens and reward contributors on Solana. The $HOBBY protocol token launches on Orynth.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hobbyhatch.xyz"),
  title,
  description,
  keywords: [
    "HobbyHatch",
    "Solana",
    "Orynth",
    "Web3 protocol",
    "hobby economy",
    "tokenization",
    "creator economy",
    "community owned",
    "SPL token",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "HobbyHatch",
    images: [{ url: "/brand/og.svg", width: 1200, height: 630, alt: "HobbyHatch" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/og.svg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBFAF8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
