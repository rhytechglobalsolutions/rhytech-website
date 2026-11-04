import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";
import {
  Shell,
  Eyebrow,
  ServiceGrid,
  ProductGrid,
  CTA,
} from "@/components/Site";
import { site } from "@/lib/content";
import PartnersSlider from "@/components/PartnersSlider";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.rhytechglobalsolutions.ca" },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": site.url + "/#organization",
        name: site.legalName,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "302, 90 Woodridge Crescent",
          addressLocality: "Ottawa",
          addressRegion: "ON",
          postalCode: "K2B 7T1",
          addressCountry: "CA",
        },
        sameAs: [
          "https://www.instagram.com/rhytechglobalsolutions/",
          "https://www.facebook.com/",
          "https://www.linkedin.com/",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": site.url + "/#localbusiness",
        name: site.name,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "302, 90 Woodridge Crescent",
          addressLocality: "Ottawa",
          addressRegion: "ON",
          postalCode: "K2B 7T1",
          addressCountry: "CA",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
        ],
      },
    ],
  };
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <Eyebrow>Technology · Design · Growth</Eyebrow>
              <h1>
                Digital Solutions <em>That Grow Your Business</em>
              </h1>
              <p>
                We help ambitious businesses turn complex challenges into clear
                digital experiences, connected systems and measurable growth.
              </p>
              <div className="hero-actions">
                <Link className="btn" href="/contact">
                  Let’s talk <ArrowUpRight size={16} />
                </Link>
                <Link className="btn btn-ghost" href="/services">
                  Explore our services <ArrowRight size={15} />
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 22,
                  marginTop: 35,
                  color: "#c8c0d3",
                  fontSize: 11,
                  fontWeight: 700,
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <Check
                    size={14}
                    style={{
                      display: "inline",
                      verticalAlign: "middle",
                      color: "#c6a8ff",
                    }}
                  />{" "}
                  Strategy-led delivery
                </span>
                <span>
                  <Check
                    size={14}
                    style={{
                      display: "inline",
                      verticalAlign: "middle",
                      color: "#c6a8ff",
                    }}
                  />{" "}
                  Built around your goals
                </span>
              </div>
            </div>

          
<div
  className="hero-art"
  role="img"
  aria-label="Premium animated violet digital sphere symbolising innovation, connected technology and business growth"
>
  {/* Ambient atmosphere */}
  <div className="hero-atmosphere" aria-hidden="true" />
  <div className="hero-art-grid" aria-hidden="true" />

  {/* Layered ambient lighting */}
  <div className="hero-glow hero-glow-one" aria-hidden="true" />
  <div className="hero-glow hero-glow-two" aria-hidden="true" />

  {/* Central orbital sculpture */}
  <div className="orbital-system" aria-hidden="true">
    <div className="orbital-ring orbital-ring-one" />
    <div className="orbital-ring orbital-ring-two" />
    <div className="orbital-ring orbital-ring-three" />

    {/* Main luminous sphere */}
    <div className="orb-core">
      <div className="orb-highlight" />
      <div className="orb-inner-glow" />
      <div className="orb-surface" />
      <div className="orb-contour" />
    </div>

    {/* Orbiting energy particles */}
    <span className="orbit-particle particle-one" />
    <span className="orbit-particle particle-two" />
    <span className="orbit-particle particle-three" />
    <span className="orbit-particle particle-four" />
  </div>

  {/* Floating glass card — digital foundations */}
  <div className="hero-float-card hero-card-one">
    <span className="hero-card-icon" aria-hidden="true">
      <span className="status-pulse" />
    </span>

    <div>
      <strong>Digital foundations</strong>
      <span>Built to work together</span>
    </div>

    <span className="hero-card-indicator" aria-hidden="true">
      01
    </span>
  </div>

  {/* Floating glass card — strategic momentum */}
  <div className="hero-float-card hero-card-two">
    <span className="hero-card-label">OUR APPROACH</span>

    <strong>
      Clarity <span>→</span> Momentum
    </strong>

    <div className="hero-progress-track" aria-hidden="true">
      <span />
    </div>

    <span className="hero-card-caption">From idea to impact</span>
  </div>

  {/* Floating glass card — connected experiences */}
  <div className="hero-float-card hero-card-three">
    <div className="connected-nodes" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>

    <div>
      <strong>Connected by design</strong>
      <span>Systems · People · Growth</span>
    </div>
  </div>

  {/* Soft reflection beneath the sphere */}
  <div className="hero-reflection" aria-hidden="true" />
</div>

          </div>
        </section>
        <PartnersSlider />
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <Eyebrow>What we do</Eyebrow>
                <h2>Expertise for your next stage.</h2>
              </div>
              <p>
                From first impression to business-critical systems, our services
                work together to move your business forward.
              </p>
            </div>
            <ServiceGrid />
            <div style={{ marginTop: 28 }}>
              <Link className="btn btn-ghost" href="/services">
                View all services <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
        <section className="section section-soft">
          <div className="container split">
            <div className="statement-card">
              <Eyebrow>Our point of view</Eyebrow>
              <h3>Technology should make business feel simpler.</h3>
              <p>
                We bring strategy, design and delivery into the same
                conversation—so every decision connects to the outcome that
                matters.
              </p>
              <div className="metric-row">
                <div className="metric">
                  <strong>01</strong>
                  <span>Clear direction</span>
                </div>
                <div className="metric">
                  <strong>02</strong>
                  <span>Thoughtful delivery</span>
                </div>
                <div className="metric">
                  <strong>03</strong>
                  <span>Room to evolve</span>
                </div>
              </div>
            </div>
            <div>
              <Eyebrow>A considered approach</Eyebrow>
              <h2>Less disconnected activity. More joined-up progress.</h2>
              <p className="lead">
                The best digital work starts with the right question. We take
                time to understand your customers, existing systems and
                ambitions before shaping a practical path forward.
              </p>
              <div className="check-list">
                <div className="check-item">
                  <span className="check">
                    <Compass size={15} />
                  </span>
                  <div>
                    <strong>Start with the real challenge</strong>
                    <p>
                      Understand the context before choosing the tools or
                      channels.
                    </p>
                  </div>
                </div>
                <div className="check-item">
                  <span className="check">
                    <WandSparkles size={15} />
                  </span>
                  <div>
                    <strong>Make every detail intentional</strong>
                    <p>
                      Bring clarity to content, design, systems and customer
                      journeys.
                    </p>
                  </div>
                </div>
                <div className="check-item">
                  <span className="check">
                    <ShieldCheck size={15} />
                  </span>
                  <div>
                    <strong>Build for the long term</strong>
                    <p>
                      Prioritize maintainability, performance, accessibility and
                      trust.
                    </p>
                  </div>
                </div>
              </div>
              <Link className="text-link" href="/about">
                Meet Rhytech <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
        <section className="section section-dark">
          <div className="container">
            <div className="section-head">
              <div>
                <Eyebrow>How we work</Eyebrow>
                <h2>Thoughtful from day one.</h2>
              </div>
              <p>
                Clear steps, shared priorities and decisions grounded in your
                business—not a one-size-fits-all process.
              </p>
            </div>
            <div className="steps">
              {[
                {
                  n: "01",
                  t: "Discover",
                  d: "Understand your goals, audience, current setup and constraints.",
                },
                {
                  n: "02",
                  t: "Define",
                  d: "Agree on priorities, scope, success measures and a realistic roadmap.",
                },
                {
                  n: "03",
                  t: "Deliver",
                  d: "Design, build and launch with care, communication and quality checks.",
                },
                {
                  n: "04",
                  t: "Improve",
                  d: "Review results, learn from feedback and identify what to refine next.",
                },
              ].map((s) => (
                <div className="step" key={s.n}>
                  <span className="num">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="products" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <Eyebrow>Built by Rhytech</Eyebrow>
                <h2>Products with a purpose.</h2>
              </div>
              <p>
                We also develop focused digital products that solve specific
                needs for learners, sports communities and families.
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>
       
      </main>
    </Shell>
  );
}
