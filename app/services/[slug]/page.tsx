
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleDot,
  Globe2,
  Layers3,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Shell, Eyebrow, CTA } from "@/components/Site";
import { services, site } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return {};

  const title = `${service.title} in Ontario, Canada`;
  const description = `${service.description} Rhytech Global Solutions supports businesses in Ontario, Canada and worldwide.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Rhytech Global Solutions`,
      description,
      url: `${site.url}/services/${service.slug}`,
      type: "website",
      
      siteName: "Rhytech Global Solutions",
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
      title: `${service.title} | Rhytech Global Solutions`,
      description,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${site.url}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Ontario, Canada",
      },
      {
        "@type": "Place",
        name: "Worldwide",
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

      <main className="premium-service">
        {/* HERO */}
        <section className="ps-hero">
          <div className="ps-hero-grid" aria-hidden="true" />
          <div className="ps-hero-glow ps-glow-one" aria-hidden="true" />
          <div className="ps-hero-glow ps-glow-two" aria-hidden="true" />

          <div className="container ps-hero-layout">
            <div className="ps-hero-copy">
              <nav className="ps-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/services">Services</Link>
                <span>/</span>
                <span aria-current="page">{service.title}</span>
              </nav>

              <div className="ps-eyebrow ps-eyebrow-light">
                <span className="ps-eyebrow-dot" />
                Rhytech Global Solutions
              </div>

              <h1>
                {service.title}
                <span className="ps-heading-accent">
                  {" "}designed around your business.
                </span>
              </h1>

              <p className="ps-hero-description">
                {service.tagline} {service.description}
              </p>

              <div className="ps-hero-actions">
                <Link href="/contact" className="ps-button ps-button-primary">
                  Discuss your project
                  <ArrowUpRight size={17} />
                </Link>

                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ps-button ps-button-glass"
                >
                  <MessageCircle size={17} />
                  Chat with us
                </a>
              </div>

              <div className="ps-hero-proof">
                <div className="ps-proof-icon">
                  <Globe2 size={17} />
                </div>
                <p>
                  <strong>Ontario, Canada</strong>
                  <span>Working with businesses worldwide</span>
                </p>
              </div>
            </div>

            <div className="ps-visual" aria-label="Our approach to delivering services">
              <div className="ps-visual-orbit ps-orbit-outer" />
              <div className="ps-visual-orbit ps-orbit-inner" />

              <div className="ps-visual-center">
                <div className="ps-center-icon">
                  <Layers3 size={31} strokeWidth={1.5} />
                </div>
                <span>RHYTECH</span>
                <strong>Built for what&apos;s next.</strong>
                <small>Strategy · Design · Delivery</small>
              </div>

              <div className="ps-floating-card ps-card-top">
                <span className="ps-floating-icon">
                  <Sparkles size={17} />
                </span>
                <span>
                  <strong>Purpose-led</strong>
                  <small>Solutions that fit</small>
                </span>
                <CheckCircle2 size={17} className="ps-card-check" />
              </div>

              <div className="ps-floating-card ps-card-bottom">
                <span className="ps-floating-icon ps-floating-icon-dark">
                  <Workflow size={17} />
                </span>
                <span>
                  <strong>Clear process</strong>
                  <small>From brief to delivery</small>
                </span>
                <MoveUpRight size={17} className="ps-card-arrow" />
              </div>

              <div className="ps-visual-caption">
                <span className="ps-caption-line" />
                <span>Technology with purpose</span>
              </div>
            </div>
          </div>

          <div className="ps-hero-bottom">
            <div className="container ps-bottom-inner">
              <span>Thoughtful planning</span>
              <span className="ps-bottom-separator">✳</span>
              <span>Purposeful execution</span>
              <span className="ps-bottom-separator">✳</span>
              <span>Long-term value</span>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="section ps-intro-section">
          <div className="container ps-intro-grid">
            <div className="ps-intro-heading">
              <Eyebrow>A smarter way forward</Eyebrow>
              <h2>{service.subhead}</h2>
              <div className="ps-heading-rule" />
            </div>

            <div className="ps-intro-content">
              <p className="ps-intro-lead">{service.body}</p>
              <p>{service.closing}</p>

              <Link href="/contact" className="ps-inline-link">
                Let&apos;s discuss your requirements
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="section ps-capabilities-section">
          <div className="container">
            <div className="ps-section-heading">
              <div>
                <Eyebrow>What we can help with</Eyebrow>
                <h2>
                  The right capabilities.
                  <br />
                  <span>A considered approach.</span>
                </h2>
              </div>
              <p>
                Every business has different priorities. We shape the scope
                around your requirements, your users, and the outcomes you want
                to achieve.
              </p>
            </div>

            <div className="ps-capability-grid">
              {service.features.map((feature, index) => (
                <article className="ps-capability-card" key={feature}>
                  <div className="ps-capability-top">
                    <span className="ps-capability-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="ps-capability-icon">
                      <Check size={17} />
                    </span>
                  </div>

                  <h3>{feature}</h3>
                  <p>
                    Defined around your requirements, users, and business
                    context, with a focus on practical value.
                  </p>

                  <div className="ps-capability-line" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY PROCESS */}
        <section className="section ps-process-section">
          <div className="container ps-process-layout">
            <div className="ps-process-intro">
              <Eyebrow>How we work</Eyebrow>
              <h2>
                Clarity at every
                <span> stage.</span>
              </h2>
              <p>
                Good delivery starts with understanding the problem. We keep
                the process collaborative, transparent, and focused on the
                agreed objectives.
              </p>

              <Link href="/contact" className="ps-button ps-button-dark">
                Start a conversation
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="ps-process-list">
              <article className="ps-process-item">
                <div className="ps-process-number">01</div>
                <div>
                  <h3>Discover</h3>
                  <p>
                    Understand your goals, audience, challenges, and existing
                    setup before defining the direction.
                  </p>
                </div>
                <CircleDot size={19} />
              </article>

              <article className="ps-process-item">
                <div className="ps-process-number">02</div>
                <div>
                  <h3>Plan</h3>
                  <p>
                    Establish priorities, scope, deliverables, and a practical
                    path forward together.
                  </p>
                </div>
                <CircleDot size={19} />
              </article>

              <article className="ps-process-item">
                <div className="ps-process-number">03</div>
                <div>
                  <h3>Deliver</h3>
                  <p>
                    Execute the agreed work in clear stages, keeping
                    communication and feedback part of the process.
                  </p>
                </div>
                <CircleDot size={19} />
              </article>

              <article className="ps-process-item">
                <div className="ps-process-number">04</div>
                <div>
                  <h3>Move forward</h3>
                  <p>
                    Review the outcome, address next steps, and identify
                    opportunities for continued improvement.
                  </p>
                </div>
                <CircleDot size={19} />
              </article>
            </div>
          </div>
        </section>

        {/* WHY RHYTECH */}
        <section className="section ps-trust-section">
          <div className="container">
            <div className="ps-trust-panel">
              <div className="ps-trust-copy">
                <Eyebrow>Why Rhytech</Eyebrow>
                <h2>
                  A partner focused on
                  <span> your bigger picture.</span>
                </h2>
                <p>
                  We bring strategy, creativity, and technology together to
                  help businesses make progress with greater clarity.
                </p>
              </div>

              <div className="ps-trust-points">
                <div className="ps-trust-point">
                  <span><CheckCircle2 size={19} /></span>
                  <div>
                    <strong>Built around your needs</strong>
                    <p>Scope and priorities shaped by your real requirements.</p>
                  </div>
                </div>

                <div className="ps-trust-point">
                  <span><ShieldCheck size={19} /></span>
                  <div>
                    <strong>Clear communication</strong>
                    <p>Aligned expectations, transparent decisions, and clear next steps.</p>
                  </div>
                </div>

                <div className="ps-trust-point">
                  <span><Globe2 size={19} /></span>
                  <div>
                    <strong>Local perspective, global reach</strong>
                    <p>Based in Ontario, Canada, supporting projects worldwide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="section ps-related-section">
          <div className="container">
            <div className="ps-related-heading">
              <div>
                <Eyebrow>Explore more</Eyebrow>
                <h2>Connected capabilities.</h2>
              </div>
              <Link href="/services" className="ps-inline-link">
                View all services
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="ps-related-grid">
              {relatedServices.map((item, index) => (
                <article className="ps-related-card" key={item.slug}>
                  <div className="ps-related-card-top">
                    <span>0{index + 1}</span>
                    <ArrowUpRight size={19} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link
                    href={`/services/${item.slug}`}
                    className="ps-related-link"
                    aria-label={`Explore ${item.title}`}
                  >
                    Explore service <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

      
      </main>
    </Shell>
  );
}
