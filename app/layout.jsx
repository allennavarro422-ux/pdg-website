import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome.jsx";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_URL = "https://pdgmarketingagency.com";
const SITE_TITLE = "PDG Marketing Agency — Websites, Logos & Video";
const SITE_DESC =
  "PDG is a solo studio building custom websites, brand identities, and video, designed and built from scratch. One studio, three crafts.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  icons: { icon: "/assets/logos/badge-favicon.jpg" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PDG Marketing Agency",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PDG — a brand that feels premium." }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
