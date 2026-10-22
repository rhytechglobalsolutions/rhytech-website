
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Compass,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Shell, Eyebrow } from "@/components/Site";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Rhytech Global Solutions | Technology, Design & Growth",
  description:
    "Discover Rhytech Global Solutions, an Ottawa, Ontario-based digital solutions company helping businesses with software development, web design, mobile applications, cloud services, SEO and digital marketing worldwide.",
  alternates: {
    canonical: "https://www.rhytechglobalsolutions.ca/about",
  },
  openGraph: {
    title: "About Rhytech Global Solutions",
    description:
      "Technology, creativity and strategy working together to move businesses forward.",
    url: "https://www.rhytechglobalsolutions.ca/about",
    siteName: "Rhytech Global Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rhytech Global Solutions",
    description:
      "Meet the approach behind our digital solutions, from strategy and design to technology and growth.",
  },
};

const principles = [
  {
    number: "01",
    icon: Target,
    title: "Purpose before pixels",
    description:
      "We start with the business objective, the audience and the problem to solve—then shape a solution around what matters.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Creativity with direction",
    description:
      "Design and creative work should do more than look good. Every experience should communicate clearly and support a meaningful goal.",
  },
  {
    number: "03",
    icon: Blocks,
    title: "Technology that fits",
    description:
      "We consider the project requirements, practical constraints and long-term needs when shaping digital experiences and systems.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Clarity throughout",
    description:
      "Good collaboration begins with clear expectations, understandable decisions and a shared view of the intended outcome.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Build",
    subtitle: "Technology & development",
    description:
      "Software, websites, mobile applications, ERP systems, data migration and cloud solutions.",
    icon: Blocks,
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Experiences & creative",
    description:
      "UX/UI design, graphic design, motion graphics and digital experiences shaped around your audience.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Grow",
    subtitle: "Visibility & marketing",
    description:
      "SEO, GEO, AEO and digital marketing to help businesses strengthen their online presence.",
    icon: Compass,
  },
];

export default function AboutPage() {
  const whatsapp = site.whatsapp || "https://wa.me/14378707083";

  return (
    <Shell>
      <main className="about-page">
        <section className="about-hero">
          <div className="about-hero-grid" aria-hidden="true" />

          <div className="container about-hero-inner">
            <div className="about-hero-copy">
              <nav className="about-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>About Us</span>
              </nav>

              <Eyebrow>About Rhytech Global Solutions</Eyebrow>

              <h1>
                We turn digital
                <span> possibilities into</span>
                <span className="about-hero-last-line">real progress.</span>
              </h1>

              <p className="about-hero-lead">
                We bring technology, thoughtful design and digital strategy
                together to help businesses solve problems, create better
                experiences and move forward with purpose.
              </p>

              <div className="about-hero-actions">
                <Link href="/contact" className="about-btn-primary">
                  Let’s work together
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>

                <a href="#our-approach" className="about-btn-secondary">
                  Discover our approach
                  <ArrowDownRight size={17} aria-hidden="true" />
                </a>
              </div>

              <div className="about-hero-note">
                <span className="about-note-line" />
                <span>
                  Based in Ottawa, Ontario.
                  <strong> Working towards possibilities worldwide.</strong>
                </span>
              </div>
            </div>

            <div className="about-hero-visual" aria-hidden="true">
              <div className="about-visual-aura" />
              <div className="about-visual-ring about-ring-one" />
              <div className="about-visual-ring about-ring-two" />

              <div className="about-visual-panel">
                <div className="about-panel-top">
                  <span className="about-panel-symbol">R</span>
                  <span className="about-panel-label">
                    DIGITAL, BUILT WITH PURPOSE
                  </span>
                </div>

                <div className="about-panel-center">
                  <div className="about-panel-orb">
                    <div className="about-orb-inner">
                      <span>R</span>
                    </div>
                  </div>

                  <span className="about-panel-overline">
                    ONE CONNECTED APPROACH
                  </span>

                  <h2>
                    Strategy.
                    <br />
                    Creativity.
                    <br />
                    Technology.
                  </h2>

                  <p>
                    Different disciplines. One shared direction: meaningful
                    progress for your business.
                  </p>
                </div>

                <div className="about-panel-bottom">
                  <span>Think clearly</span>
                  <span className="about-panel-dot" />
                  <span>Build thoughtfully</span>
                </div>
              </div>

              <div className="about-float-chip about-chip-top">
                <span className="about-chip-icon">
                  <Lightbulb size={17} />
                </span>
                <span>
                  <strong>Ideas into action</strong>
                  <small>Purpose-led solutions</small>
                </span>
              </div>

              <div className="about-float-chip about-chip-bottom">
                <span className="about-chip-icon about-chip-icon-light">
                  <Target size={17} />
                </span>
                <span>
                  <strong>Built around your goals</strong>
                  <small>Business-first thinking</small>
                </span>
              </div>
            </div>
          </div>

          <div className="about-hero-ribbon" aria-hidden="true">
            <span>Understand</span>
            <i />
            <span>Imagine</span>
            <i />
            <span>Create</span>
            <i />
            <span>Improve</span>
          </div>
        </section>

        <section className="about-intro-section">
          <div className="container about-intro-grid">
            <div className="about-intro-heading">
              <Eyebrow>Who we are</Eyebrow>
              <h2>
                More than a service.
                <span> A considered approach.</span>
              </h2>
            </div>

            <div className="about-intro-copy">
              <p className="about-intro-lead">
                Every business has a different challenge. The right solution
                begins with understanding it.
              </p>

              <p>
                Rhytech Global Solutions brings together digital services
                across development, design and marketing. Our approach is
                centred on understanding your needs, choosing a practical
                direction and creating work that supports your objectives.
              </p>

              <p>
                Whether you are establishing your online presence, improving
                an existing platform or exploring a new digital product, the
                goal is the same: make technology and creativity work for
                your business.
              </p>

              <Link href="/contact" className="about-text-link">
                Tell us what you’re working on
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="about-principles-section" id="our-approach">
          <div className="container">
            <div className="about-section-heading">
              <div>
                <Eyebrow>What guides us</Eyebrow>
                <h2>
                  Good work starts
                  <span> with good thinking.</span>
                </h2>
              </div>

              <p>
                The principles behind how we approach challenges, make
                decisions and shape digital solutions.
              </p>
            </div>

            <div className="about-principles-grid">
              {principles.map((principle) => {
                const Icon = principle.icon;

                return (
                  <article
                    className="about-principle-card"
                    key={principle.number}
                  >
                    <div className="about-principle-top">
                      <span className="about-principle-number">
                        {principle.number}
                      </span>

                      <span className="about-principle-icon">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                    </div>

                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>

                    <span
                      className="about-principle-decoration"
                      aria-hidden="true"
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-capabilities-section">
          <div className="container">
            <div className="about-capabilities-heading">
              <Eyebrow>What we bring together</Eyebrow>
              <h2>
                Connected capabilities.
                <span> A bigger picture.</span>
              </h2>
              <p>
                From the systems behind your business to the experiences
                customers see, our services cover three connected areas.
              </p>
            </div>

            <div className="about-capabilities-list">
              {capabilities.map((capability) => {
                const Icon = capability.icon;

                return (
                  <article
                    className="about-capability-row"
                    key={capability.number}
                  >
                    <span className="about-capability-number">
                      {capability.number}
                    </span>

                    <span className="about-capability-icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>

                    <div className="about-capability-title">
                      <span>{capability.subtitle}</span>
                      <h3>{capability.title}</h3>
                    </div>

                    <p>{capability.description}</p>

                    <Link
                      href="/services"
                      className="about-capability-link"
                      aria-label={`Explore services: ${capability.title}`}
                    >
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="about-capabilities-footer">
              <span>Looking for something specific?</span>
              <Link href="/services">
                Explore all services
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="about-collaboration-section">
          <div className="container about-collaboration-grid">
            <div className="about-collaboration-visual" aria-hidden="true">
              <div className="about-collaboration-glow" />
              <div className="about-collaboration-orbit about-collab-orbit-one" />
              <div className="about-collaboration-orbit about-collab-orbit-two" />

              <div className="about-collab-center">
                <span className="about-collab-center-mark">R</span>
                <span>Shared direction</span>
              </div>

              <div className="about-collab-node about-node-one">
                <span className="about-node-symbol">
                  <Target size={18} />
                </span>
                <span>Goals</span>
              </div>

              <div className="about-collab-node about-node-two">
                <span className="about-node-symbol">
                  <Sparkles size={18} />
                </span>
                <span>Ideas</span>
              </div>

              <div className="about-collab-node about-node-three">
                <span className="about-node-symbol">
                  <Blocks size={18} />
                </span>
                <span>Solutions</span>
              </div>
            </div>

            <div className="about-collaboration-copy">
              <Eyebrow>Built through collaboration</Eyebrow>
              <h2>
                Your goals shape
                <span> the direction.</span>
              </h2>

              <p>
                A strong digital outcome is not just about delivering a
                service. It is about understanding the context, agreeing on
                what success should look like and making thoughtful decisions
                along the way.
              </p>

              <p>
                We want the process to feel clear and purposeful—from the
                first conversation through to the solution that takes shape.
              </p>

              <ul className="about-collaboration-list">
                <li>
                  <ShieldCheck size={17} aria-hidden="true" />
                  Clear objectives and expectations
                </li>
                <li>
                  <ShieldCheck size={17} aria-hidden="true" />
                  Solutions shaped around your needs
                </li>
                <li>
                  <ShieldCheck size={17} aria-hidden="true" />
                  A focus on practical business outcomes
                </li>
              </ul>

              <Link href="/contact" className="about-btn-primary">
                Start a conversation
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

       
      </main>
    </Shell>
  );
}
