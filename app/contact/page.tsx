
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Shell, Eyebrow } from "@/components/Site";
import { site } from "@/lib/content";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Rhytech Global Solutions | Get a Project Quote",
  description:
    "Talk to Rhytech Global Solutions about software development, website design, mobile apps, cloud services, SEO and digital marketing. Based in Ottawa, Ontario, Canada, serving clients worldwide.",
  alternates: {
    canonical: "https://www.rhytechglobalsolutions.ca/contact",
  },
  openGraph: {
    title: "Let's Build Something That Moves You Forward",
    description:
      "Discuss your goals with Rhytech Global Solutions. Get in touch about your next digital project.",
    url: "https://www.rhytechglobalsolutions.ca/contact",
    siteName: "Rhytech Global Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rhytech Global Solutions",
    description:
      "Have a project in mind? Let's discuss the right next step.",
  },
};

const contactItems = [
  {
    icon: Phone,
    label: "Call our team",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    detail: "Speak with us about your project",
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
    detail: "Share your brief or questions",
  },
  {
    icon: Mail,
    label: "Proposals & RFPs",
    value: site.proposalsEmail,
    href: `mailto:${site.proposalsEmail}`,
    detail: "Send RFPs, proposals and partnership briefs",
  },
  {
    icon: MapPin,
    label: "Our office",
    value: site.address,
    href: "https://maps.google.com/?q=302+90+Woodridge+Crescent+Ottawa+ON+K2B+7T1",
    detail: "Ottawa, Ontario, Canada",
  },
];

export default function ContactPage() {
  const whatsapp =
    site.whatsapp || "https://wa.me/14378707083";

  return (
    <Shell>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-grid" aria-hidden="true" />

          <div className="container contact-hero-inner">
            <div className="contact-hero-copy">
              <nav className="contact-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Contact</span>
              </nav>

              <Eyebrow>Let’s start a conversation</Eyebrow>

              <h1>
                Your next big idea
                <span> starts here.</span>
              </h1>

              <p className="contact-hero-lead">
                Tell us where you want to go. We’ll help you explore the
                right digital solutions to move your business forward.
              </p>

              <div className="contact-hero-actions">
                <a href="#project-enquiry" className="contact-btn-primary">
                  Discuss your project
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn-secondary"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="contact-trust-line">
                <span className="contact-trust-icon">
                  <ShieldCheck size={17} aria-hidden="true" />
                </span>
                <span>
                  A straightforward conversation. No pressure, just a
                  clearer next step.
                </span>
              </div>
            </div>

            <div className="contact-hero-visual" aria-hidden="true">
              <div className="contact-visual-orbit contact-orbit-one" />
              <div className="contact-visual-orbit contact-orbit-two" />

              <div className="contact-visual-card">
                <div className="contact-visual-card-top">
                  <span className="contact-visual-mark">R</span>
                  <span className="contact-visual-status">
                    <span />
                    Ready to connect
                  </span>
                </div>

                <div className="contact-visual-message">
                  <span className="contact-visual-kicker">
                    THE NEXT STEP
                  </span>
                  <h2>Good things begin with a conversation.</h2>
                  <p>
                    Your goals. Our expertise. A plan built around what
                    matters to your business.
                  </p>
                </div>

                <div className="contact-visual-footer">
                  <span>Ideas into action</span>
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="contact-floating-note">
                <span className="contact-floating-icon">
                  <MessageCircle size={17} />
                </span>
                <span>
                  <strong>Let’s talk</strong>
                  <small>Your project starts here</small>
                </span>
              </div>
            </div>
          </div>

          <div className="contact-hero-bottom" aria-hidden="true">
            <span>Strategy</span>
            <i />
            <span>Design</span>
            <i />
            <span>Technology</span>
            <i />
            <span>Growth</span>
          </div>
        </section>

        <section className="contact-main-section">
          <div className="container">
            <div className="contact-section-heading">
              <div>
                <Eyebrow>Get in touch</Eyebrow>
                <h2>
                  Let’s make your
                  <span> next move count.</span>
                </h2>
              </div>

              <p>
                Whether you have a detailed brief or just the beginning
                of an idea, we’re ready to hear from you.
              </p>
            </div>

            <div className="contact-content-grid">
              <aside className="contact-info-column">
                <div className="contact-info-heading">
                  <span className="contact-mini-label">
                    CONTACT INFORMATION
                  </span>
                  <h3>Reach the right people.</h3>
                  <p>
                    Choose whichever way is most convenient for you.
                  </p>
                </div>

                <div className="contact-method-list">
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        className="contact-method"
                        href={item.href}
                        key={item.label}
                        target={
                          item.label === "Our office" ? "_blank" : undefined
                        }
                        rel={
                          item.label === "Our office"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <span className="contact-method-icon">
                          <Icon size={19} aria-hidden="true" />
                        </span>

                        <span className="contact-method-copy">
                          <strong>{item.label}</strong>
                          <span className="contact-method-value">
                            {item.value}
                          </span>
                          <small>{item.detail}</small>
                        </span>

                        <ArrowUpRight
                          className="contact-method-arrow"
                          size={17}
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>

                <a
                  className="contact-whatsapp-card"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-whatsapp-icon">
                    <MessageCircle size={20} aria-hidden="true" />
                  </span>

                  <span>
                    <strong>Prefer a quick chat?</strong>
                    <small>Connect with us on WhatsApp.</small>
                  </span>

                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>

                <div className="contact-hours">
                  <span className="contact-hours-icon">
                    <Clock3 size={18} aria-hidden="true" />
                  </span>

                  <div>
                    <strong>Business hours</strong>
                    <p>Monday – Saturday</p>
                    <p>9:00 am – 7:00 pm</p>
                    <span className="contact-closed">
                      Sunday · Closed
                    </span>
                  </div>
                </div>
              </aside>

              <div className="contact-form-column" id="project-enquiry">
                <div className="contact-form-heading">
                  <span className="contact-mini-label">
                    PROJECT ENQUIRY
                  </span>
                  <h3>Tell us what you have in mind.</h3>
                  <p>
                    A few details will help us understand what you need.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </section>

       
      </main>
    </Shell>
  );
}
