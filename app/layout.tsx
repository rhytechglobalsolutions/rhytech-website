
import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content";
import { Manrope, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Rhytech Global Solutions | Digital Transformation & Technology",
    template: "%s | Rhytech Global Solutions",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title:
      "Rhytech Global Solutions | Digital Transformation & Technology",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhytech Global Solutions",
    description: site.description,
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <meta name="google-site-verification" content="1JGobz-wqDC4eAzwtPETJeNqOpTRXvtVpSwKnJfXoYs" />
      <body
        className={`${manrope.variable} ${inter.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
         <GoogleAnalytics gaId="G-GGB4TP5KJC" />
      </body>
    </html>
  );
}
