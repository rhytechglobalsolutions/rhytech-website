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
    default: "Rhytech Global Solutions | Digital Transformation & Technology",
    template: "%s | Rhytech Global Solutions",
  },

  description: site.description,

  openGraph: {
  title: "Rhytech Global Solutions | Digital Transformation & Technology",
  description:
    "Digital transformation, software development, web design, cloud, ERP and digital marketing solutions.",
  url: "https://www.rhytechglobalsolutions.ca",
  siteName: "Rhytech Global Solutions",
  images: [
    {
      url: "/images/rhytech-og-image.png",
      width: 1200,
      height: 630,
      alt: "Rhytech Global Solutions – Digital Transformation & Technology",
    },
  ],
  locale: "en_CA",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Rhytech Global Solutions | Digital Transformation & Technology",
  description:
    "Technology, design and digital growth solutions for businesses.",
  images: ["/images/rhytech-og-image.png"],
},
  

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.webp", type: "image/webp" },
    ],
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
      <meta
        name="google-site-verification"
        content="1JGobz-wqDC4eAzwtPETJeNqOpTRXvtVpSwKnJfXoYs"
      />
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-GGB4TP5KJC" />
      </body>
    </html>
  );
}
