import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Digital Services",

  description:
    "Find answers about Rhytech Global Solutions, including software development, website design, pricing, technology, SEO, GEO, AEO and digital marketing services.",

  alternates: {
    canonical: "https://www.rhytechglobalsolutions.ca/faqs",
  },

  openGraph: {
    title: "Frequently Asked Questions | Rhytech Global Solutions",
    description:
      "Get answers about our digital services, technology, project process and pricing.",
    url: "https://www.rhytechglobalsolutions.ca/faqs",
    siteName: "Rhytech Global Solutions",
    type: "website",
    images: [
    {
      url: "https://www.rhytechglobalsolutions.ca/images/rhytech-og-image.png",
      width: 1200,
      height: 630,
      alt: "Faqs Rhytech Global Solutions",
    },
]
  },

  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Rhytech Global Solutions",
    description:
      "Answers about Rhytech's digital services, technology and project process.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}