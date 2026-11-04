import type { Metadata } from "next";
import Link from "next/link";
import { Shell, Eyebrow, ServiceGrid, CTA } from "@/components/Site";

export const metadata: Metadata = {
  title: "Technology, Design & Marketing Services",
  description:
    "Explore Rhytech Global Solutions services in Ontario, Canada—from software development and web design to SEO, digital marketing, cloud and ERP. Serving clients worldwide.",
  alternates: {
    canonical: "https://www.rhytechglobalsolutions.ca/services",
  },
  openGraph: {
    title: "Technology, Design & Marketing Services | Rhytech Global Solutions",
    description:
      "Explore technology, design and digital growth services for businesses, including software development, web design, SEO, cloud and ERP solutions.",
    url: "https://www.rhytechglobalsolutions.ca/services",
    siteName: "Rhytech Global Solutions",
    type: "website",
    images: [
    {
      url: "https://www.rhytechglobalsolutions.ca/images/rhytech-og-image.png",
      width: 1200,
      height: 630,
      alt: "Services Rhytech Global Solutions",
    },
  ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology, Design & Marketing Services | Rhytech Global Solutions",
    description:
      "Explore software development, web design, SEO, digital marketing, cloud and ERP services from Rhytech Global Solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link> / Services
            </div>

            <Eyebrow>Our services</Eyebrow>

            <h1>Everything you need to move your business forward.</h1>

            <p className="lead">
              A connected set of technology, design and growth
              services—delivered with a clear understanding of your business and
              the people it serves.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <ServiceGrid />
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <CTA />
          </div>
        </section>
      </main>
    </Shell>
  );
}
