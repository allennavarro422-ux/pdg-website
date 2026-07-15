import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome.jsx";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "PDG Marketing Agency — Websites, Logos & Video",
  description:
    "PDG is a solo studio building custom websites, brand identities, and video, designed and built from scratch. One studio, three crafts.",
  icons: { icon: "/assets/logos/badge-favicon.jpg" },
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
