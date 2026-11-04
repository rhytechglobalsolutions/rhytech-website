import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  ExternalLink,
  Globe2,
  Layers3,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Shell, Eyebrow, CTA } from "@/components/Site";
import { products, site } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.title;

  const description = product.description;

  const canonical = `${site.url}/products/${product.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${title} | Rhytech Global Solutions`,
      description,
      url: canonical,
      siteName: "Rhytech Global Solutions",
      type: "website",
      images: [
        {
          url: "https://www.rhytechglobalsolutions.ca/images/rhytech-og-image.png",
          width: 1200,
          height: 630,
          alt: "Products Rhytech Global Solutions",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Rhytech Global Solutions`,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const faqs = [
    {
      q: `What is ${product.title}?`,
      a: product.whatbody,
    },
    {
      q: `Who is ${product.title} designed for?`,
      a: product.description,
    },
    {
      q: `How does ${product.title} help?`,
      a: product.helps,
    },
    {
      q: `Where can I try ${product.title}?`,
      a: `Visit the official ${product.title} website using the Try Live link on this page.`,
    },
    {
      q: `Who developed ${product.title}?`,
      a: `${product.title} is a product developed by Rhytech Global Solutions Inc.`,
    },
    {
      q: `How can I contact the team about ${product.title}?`,
      a: `Contact Rhytech Global Solutions at ${site.phone} or ${site.email}, or start a conversation on WhatsApp.`,
    },
  ];

  const canonicalUrl = `${site.url}/products/${product.slug}`;

  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const webpageId = `${canonicalUrl}/#webpage`;
  const softwareId = `${canonicalUrl}/#software`;
  const faqId = `${canonicalUrl}/#faq`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.legalName,
        url: site.url,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Rhytech Global Solutions",
        url: site.url,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: canonicalUrl,
        name: product.title,
        description: product.description,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": softwareId,
        },
        breadcrumb: {
          "@id": `${canonicalUrl}/#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: product.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: product.description,
        url: product.url,
        mainEntityOfPage: {
          "@id": webpageId,
        },
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${canonicalUrl}#faqs`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <main className="premium-product">
        {/* PRODUCT HERO */}
        <section className="pp-hero">
          <div className="pp-hero-grid" aria-hidden="true" />
          <div className="pp-hero-glow pp-glow-a" aria-hidden="true" />
          <div className="pp-hero-glow pp-glow-b" aria-hidden="true" />

          <div className="container pp-hero-layout">
            <div className="pp-hero-copy">
              <nav className="pp-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span aria-current="page">{product.title}</span>
              </nav>

              <div className="pp-product-label">
                <span className="pp-live-dot" />A Rhytech product
              </div>

              <Eyebrow>{product.title}</Eyebrow>

              <h1>
                Meet
                <span className="pp-title-accent"> {product.title}.</span>
                <span className="pp-title-second">
                  {" "}
                  Made for a better experience.
                </span>
              </h1>

              <p className="pp-tagline">{product.tagline}</p>

              <p className="pp-hero-description">{product.description}</p>

              <div className="pp-hero-actions">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-button pp-button-primary"
                >
                  Try live
                  <ArrowUpRight size={17} />
                </a>

                <Link href="/contact" className="pp-button pp-button-outline">
                  Learn more
                  <ArrowRight size={17} />
                </Link>
              </div>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-whatsapp-link"
              >
                <MessageCircle size={16} />
                Have a question? Chat with us
                <ArrowUpRight size={14} />
              </a>

              <div className="pp-hero-meta">
                <div className="pp-meta-icon">
                  <Globe2 size={17} />
                </div>
                <div>
                  <strong>Designed with purpose</strong>
                  <span>Developed by Rhytech Global Solutions Inc.</span>
                </div>
              </div>
            </div>

            {/* PRODUCT VISUAL */}
            <div className="pp-product-visual">
              <div className="pp-visual-orbit pp-visual-orbit-one" />
              <div className="pp-visual-orbit pp-visual-orbit-two" />
              <div className="pp-visual-orbit pp-visual-orbit-three" />

              {/* <div className="pp-visual-top-label">
                <span className="pp-visual-dot" />
                PRODUCT EXPERIENCE
              </div> */}

              <div className="pp-product-window">
                <div className="pp-window-top">
                  <div className="pp-window-controls">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="pp-window-caption">{product.title}</span>
                  <Sparkles size={15} />
                </div>

                <div className="pp-window-content">
                  <div className="pp-window-overline">INTRODUCING</div>
                  <div className="pp-window-title">{product.title}</div>
                  <p className="pp-window-tagline">{product.tagline}</p>

                  <div className="pp-window-divider" />

                  <div className="pp-window-feature-heading">
                    <span>Designed around your needs</span>
                    <CheckCircle2 size={17} />
                  </div>

                  <div className="pp-window-feature-list">
                    {product.features.slice(0, 3).map((feature) => (
                      <div className="pp-window-feature" key={feature}>
                        <span>
                          <Check size={12} />
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    className="pp-window-launch"
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Launch ${product.title} website`}
                  >
                    Explore product
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              <div className="pp-float-card pp-float-top">
                <span className="pp-float-icon">
                  <Sparkles size={17} />
                </span>
                <span>
                  <strong>Ready to explore</strong>
                  <small>Built around the experience</small>
                </span>
              </div>

              <div className="pp-visual-bottom-label">
                <span />
                Technology that serves a purpose
              </div>
            </div>
          </div>

          <div className="pp-hero-footer">
            <div className="container pp-hero-footer-inner">
              <span>
                <CheckCircle2 size={15} /> Purpose-led products
              </span>
              <span>
                <Layers3 size={15} /> Thoughtful experiences
              </span>
              <span>
                <Compass size={15} /> Built to solve real needs
              </span>
            </div>
          </div>
        </section>

        {/* PRODUCT INTRODUCTION */}
        <section className="section pp-intro-section">
          <div className="container pp-intro-grid">
            <div className="pp-intro-heading">
              <Eyebrow>Get to know the product</Eyebrow>
              <h2>{product.what}</h2>
              <div className="pp-heading-line" />
            </div>

            <div className="pp-intro-copy">
              <p className="pp-intro-lead">{product.whatbody}</p>
              <p>{product.helps}</p>
              <p>{product.closing}</p>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-inline-link"
              >
                Explore {product.title}
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section pp-features-section">
          <div className="container">
            <div className="pp-section-heading">
              <div>
                <Eyebrow>What makes it useful</Eyebrow>
                <h2>
                  A closer look at
                  <span> the experience.</span>
                </h2>
              </div>
              <p>
                Discover the key elements of {product.title} and how they
                contribute to a more considered, useful product experience.
              </p>
            </div>

            <div className="pp-feature-grid">
              {product.features.map((feature, index) => (
                <article className="pp-feature-card" key={feature}>
                  <div className="pp-feature-card-top">
                    <span className="pp-feature-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pp-feature-icon">
                      {index % 3 === 0 ? (
                        <Sparkles size={19} />
                      ) : index % 3 === 1 ? (
                        <Layers3 size={19} />
                      ) : (
                        <CheckCircle2 size={19} />
                      )}
                    </span>
                  </div>

                  <h3>{feature}</h3>
                  <p>
                    {feature} is part of the product experience, designed to
                    support the needs and goals of its intended users.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="section pp-benefits-section">
          <div className="container pp-benefits-layout">
            <div className="pp-benefits-copy">
              <Eyebrow>How it helps</Eyebrow>
              <h2>
                Less friction.
                <br />
                <span>More clarity.</span>
              </h2>
              <p>{product.helps}</p>
              <p>{product.closing}</p>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-button pp-button-dark"
              >
                Experience {product.title}
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="pp-benefit-panel">
              <div className="pp-benefit-panel-header">
                <div>
                  <span className="pp-panel-kicker">THE PRODUCT APPROACH</span>
                  <h3>Designed around people.</h3>
                </div>
                <span className="pp-benefit-badge">
                  <Sparkles size={18} />
                </span>
              </div>

              <div className="pp-benefit-row">
                <span className="pp-benefit-icon">
                  <Compass size={19} />
                </span>
                <div>
                  <strong>A clearer experience</strong>
                  <p>Help users understand the product and its purpose.</p>
                </div>
                <CheckCircle2 size={18} />
              </div>

              <div className="pp-benefit-row">
                <span className="pp-benefit-icon">
                  <Layers3 size={19} />
                </span>
                <div>
                  <strong>Purposeful functionality</strong>
                  <p>Keep the focus on the product&apos;s core use case.</p>
                </div>
                <CheckCircle2 size={18} />
              </div>

              <div className="pp-benefit-row">
                <span className="pp-benefit-icon">
                  <Workflow size={19} />
                </span>
                <div>
                  <strong>A practical starting point</strong>
                  <p>
                    Explore the product directly to understand how it works.
                  </p>
                </div>
                <CheckCircle2 size={18} />
              </div>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-panel-action"
              >
                Visit the live product
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="section pp-faq-section">
          <div className="container pp-faq-layout">
            <div className="pp-faq-heading">
              <Eyebrow>Questions, answered</Eyebrow>
              <h2>
                Everything you need
                <span> to know.</span>
              </h2>
              <p>
                Have another question about {product.title}? Our team can help
                you find the information you need.
              </p>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-inline-link"
              >
                Ask us on WhatsApp
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="pp-faq-list">
              {faqs.map((faq, index) => (
                <details className="pp-faq-item" key={faq.q}>
                  <summary>
                    <span className="pp-faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pp-faq-question">{faq.q}</span>
                    <span className="pp-faq-toggle">
                      <ArrowDownRight size={16} />
                    </span>
                  </summary>
                  <div className="pp-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section pp-final-section">
          <div className="container">
            <div className="pp-final-panel">
              <div className="pp-final-orbit" aria-hidden="true" />

              <div className="pp-final-copy">
                <span className="pp-final-kicker">
                  <span />
                  Your next discovery starts here
                </span>
                <h2>
                  Ready to experience
                  <br />
                  {product.title}?
                </h2>
                <p>
                  Visit the live product or contact Rhytech Global Solutions to
                  learn more about its purpose and capabilities.
                </p>
              </div>

              <div className="pp-final-actions">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-button pp-button-white"
                >
                  Try live <ArrowUpRight size={17} />
                </a>

                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-final-whatsapp"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="pp-final-note">
              <ShieldCheck size={15} />
              <span>
                {product.title} is part of the Rhytech Global Solutions product
                portfolio.
              </span>
            </div>
          </div>
        </section>

        {/* <section className="section pp-shared-cta">
          <div className="container">
            <CTA />
          </div>
        </section> */}
      </main>
    </Shell>
  );
}
