"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Globe2,
  HelpCircle,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const categories = [
  "All questions",
  "General",
  "Services",
  "Process & Pricing",
  "Technology",
  "SEO & Marketing",
];

const faqs = [
  {
    category: "General",
    question: "What is Rhytech Global Solutions?",
    answer:
      "Rhytech Global Solutions Inc. is a digital solutions company based in Ottawa, Ontario, Canada. We help businesses strengthen their digital presence through software development, website design, mobile applications, cloud services, data solutions, digital marketing and more.",
  },
  {
    category: "General",
    question: "Which businesses do you work with?",
    answer:
      "We work with startups, small and medium-sized businesses, growing organizations and established companies. Our solutions are tailored to your business goals, audience, operational needs and available resources.",
  },
  {
    category: "General",
    question: "Do you work with clients outside Canada?",
    answer:
      "Yes. While based in Ottawa, Ontario, we can work with businesses in Canada and internationally. Project communication, timelines and delivery arrangements are agreed upon according to each client's requirements.",
  },
  {
    category: "General",
    question: "How can I get started with Rhytech?",
    answer:
      "Contact us through our website or WhatsApp and tell us about your project, goals and priorities. We will discuss your requirements, recommend a suitable approach and outline the next steps.",
  },
  {
    category: "Services",
    question: "What digital services do you provide?",
    answer:
      "Our services include software development, website design, mobile applications, data migration, motion graphics, cloud services, SEO, GEO and AEO, digital marketing, UX/UI design, graphic design, data entry and ERP systems.",
  },
  {
    category: "Services",
    question: "Can you build a website tailored to my business?",
    answer:
      "Yes. We design and develop websites around your brand, audience, business objectives and required functionality. Depending on the project, solutions can include corporate websites, landing pages, e-commerce stores, custom web applications and content-managed websites.",
  },
  {
    category: "Services",
    question: "Do you develop custom software and business applications?",
    answer:
      "Yes. We can help plan and develop software solutions based on your operational requirements. The recommended technology, integrations, features and delivery scope depend on the complexity of your project.",
  },
  {
    category: "Services",
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We can review your existing website and identify opportunities to improve its visual design, responsive behaviour, user experience, content structure and technical performance. The exact scope is agreed upon before work begins.",
  },
  {
    category: "Services",
    question: "Do you provide mobile app development?",
    answer:
      "We provide mobile application development services based on project requirements. During discovery, we discuss the intended users, essential features, target platforms, integrations and maintenance needs to determine an appropriate solution.",
  },
  {
    category: "Services",
    question: "Can you help with cloud services and data migration?",
    answer:
      "Yes. We offer cloud-related services and data migration support. We first assess the current infrastructure, data sources, dependencies, security considerations and business continuity requirements before defining an implementation approach.",
  },
  {
    category: "Process & Pricing",
    question: "How much does a project cost?",
    answer:
      "Pricing depends on the project scope, design requirements, functionality, integrations, content, delivery timeline and ongoing support needs. After understanding your requirements, we can discuss a suitable scope and provide a quotation.",
  },
  {
    category: "Process & Pricing",
    question: "How long does it take to complete a project?",
    answer:
      "Timelines vary depending on complexity, the number of deliverables, feedback cycles, content readiness and third-party integrations. We establish milestones and an estimated delivery schedule after defining the project scope.",
  },
  {
    category: "Process & Pricing",
    question: "What is your project development process?",
    answer:
      "Our approach typically includes discovery, planning, design, development, testing, launch and ongoing improvement where required. The process is adapted to the type of project, with agreed priorities and communication throughout delivery.",
  },
  {
    category: "Process & Pricing",
    question: "Will I be involved throughout the project?",
    answer:
      "Yes. Your input helps ensure that the result aligns with your goals. We establish communication expectations, review milestones and gather feedback at appropriate stages of the project.",
  },
  {
    category: "Process & Pricing",
    question: "Do you provide maintenance and ongoing support?",
    answer:
      "Ongoing maintenance and support can be discussed as part of your project. Available services, response expectations, updates and associated fees depend on the agreed support arrangement.",
  },
  {
    category: "Technology",
    question: "Which technologies do you work with?",
    answer:
      "Technology choices depend on the project. Our work can involve modern web development frameworks, content management systems, e-commerce platforms, cloud infrastructure, databases, APIs and business software integrations. We recommend tools based on suitability rather than choosing a stack without understanding your needs.",
  },
  {
    category: "Technology",
    question: "Can you integrate third-party APIs and existing systems?",
    answer:
      "Yes, where compatible APIs and access permissions are available. We assess documentation, authentication, data requirements, technical limitations and associated third-party costs before confirming the integration scope.",
  },
  {
    category: "Technology",
    question: "Will my website work on mobile devices?",
    answer:
      "Responsive design is an important consideration in our website projects. Layouts, navigation, forms, imagery and interactive elements should be designed and tested for different screen sizes and common device types.",
  },
  {
    category: "Technology",
    question: "Can you help improve website security and performance?",
    answer:
      "We can assess opportunities to improve performance, configuration and security practices within the agreed scope. The work may include performance optimization, software updates, secure integrations and technical recommendations. No website can be guaranteed to be completely risk-free.",
  },
  {
    category: "SEO & Marketing",
    question: "Do you provide SEO services?",
    answer:
      "Yes. Our SEO services can include technical SEO, keyword and search-intent research, content structure, metadata, internal linking, structured data and performance improvements. The deliverables depend on your website, competition and objectives.",
  },
  {
    category: "SEO & Marketing",
    question: "What are GEO and AEO?",
    answer:
      "GEO, or Generative Engine Optimization, focuses on making useful, trustworthy information easier for AI-powered discovery experiences to interpret and reference. AEO, or Answer Engine Optimization, focuses on clearly answering relevant questions. Both complement a strong technical SEO and content strategy.",
  },
  {
    category: "SEO & Marketing",
    question: "Can you guarantee first-page Google rankings?",
    answer:
      "No responsible SEO provider can guarantee specific organic rankings. Search results depend on competition, search engine systems, website quality, content relevance and many other factors. We focus on sustainable improvements, measurable goals and transparent reporting where included.",
  },
  {
    category: "SEO & Marketing",
    question: "Do you offer digital marketing and creative design?",
    answer:
      "Yes. We offer digital marketing, graphic design and motion graphics services. Depending on the project, these may support brand awareness, campaign creative, social media content, visual communication and customer acquisition.",
  },
];

const icons: Record<string, ReactNode> = {
  General: <HelpCircle size={18} />,
  Services: <Code2 size={18} />,
  "Process & Pricing": <Zap size={18} />,
  Technology: <ShieldCheck size={18} />,
  "SEO & Marketing": <Globe2 size={18} />,
};

export default function FAQsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const [activeCategory, setActiveCategory] = useState("All questions");
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs
      .map((faq, index) => ({ ...faq, originalIndex: index }))
      .filter((faq) => {
        const matchesCategory =
          activeCategory === "All questions" ||
          faq.category === activeCategory;

        const matchesSearch =
          !query ||
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      });
  }, [activeCategory, search]);

  function toggleItem(index: number) {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function clearFilters() {
    setSearch("");
    setActiveCategory("All questions");
  }

  return (
    <main className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-grid" aria-hidden="true" />
        <div className="faq-hero-glow faq-hero-glow-one" aria-hidden="true" />
        <div className="faq-hero-glow faq-hero-glow-two" aria-hidden="true" />

        <div className="faq-container faq-hero-layout">
          <div className="faq-hero-content">
            <div className="faq-eyebrow faq-eyebrow-light">
              <Sparkles size={14} />
              <span>HERE TO HELP</span>
            </div>

            <h1>
              Good questions.
              <br />
              <span>Clear answers.</span>
            </h1>

            <p className="faq-hero-description">
              Everything you need to know about our digital services,
              technology, project process and how we can help your business
              move forward.
            </p>

            <div className="faq-hero-actions">
              <a href="#faq-list" className="faq-primary-button">
                Explore FAQs
                <ArrowDownRight size={17} />
              </a>

              <Link href="/contact" className="faq-secondary-button">
                Talk to our team
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="faq-trust-line">
              <CheckCircle2 size={16} />
              <span>Practical answers. A considered approach.</span>
            </div>
          </div>

          <div className="faq-hero-visual" aria-hidden="true">
            <div className="faq-visual-orbit faq-visual-orbit-one" />
            <div className="faq-visual-orbit faq-visual-orbit-two" />

            <div className="faq-visual-core">
              <MessageCircle size={54} strokeWidth={1.15} />
              <span className="faq-core-spark faq-core-spark-one" />
              <span className="faq-core-spark faq-core-spark-two" />
            </div>

            <div className="faq-floating-note faq-note-one">
              <span className="faq-note-icon">
                <CheckCircle2 size={17} />
              </span>
              <span>
                <strong>Clear direction</strong>
                <small>Know what comes next</small>
              </span>
            </div>

            <div className="faq-floating-note faq-note-two">
              <span className="faq-note-icon faq-note-icon-purple">
                <Zap size={17} />
              </span>
              <span>
                <strong>Built around you</strong>
                <small>Answers for your goals</small>
              </span>
            </div>

            <span className="faq-visual-caption">
              CLARITY STARTS HERE
            </span>
          </div>
        </div>

        <div className="faq-hero-bottom">
          <div className="faq-container faq-hero-bottom-inner">
            <span>RHYTECH GLOBAL SOLUTIONS</span>
            <span className="faq-bottom-divider" />
            <span>YOUR QUESTIONS, ANSWERED</span>
          </div>
        </div>
      </section>

      {/* FAQ search and content */}
      <section className="faq-main-section" id="faq-list">
        <div className="faq-container">
          <div className="faq-section-heading">
            <div>
              <div className="faq-eyebrow">
                <span>THE KNOW-HOW</span>
              </div>
              <h2>
                What would you
                <br className="faq-heading-break" /> like to know?
              </h2>
            </div>

            <p>
              Browse by topic or search for a specific question. If you
              need advice about your own project, we&apos;re happy to help.
            </p>
          </div>

          {/* Search */}
          <div className="faq-search-wrap">
            <Search size={20} className="faq-search-icon" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search questions, services, pricing..."
              aria-label="Search frequently asked questions"
            />

            {search && (
              <button
                type="button"
                className="faq-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

            <span className="faq-search-shortcut">FAQ SEARCH</span>
          </div>

          {/* Category filters */}
          <div
            className="faq-category-list"
            role="group"
            aria-label="Filter questions by category"
          >
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`faq-category-button ${
                  activeCategory === category ? "active" : ""
                }`}
                aria-pressed={activeCategory === category}
              >
                {category !== "All questions" && (
                  <span className="faq-category-icon">
                    {icons[category]}
                  </span>
                )}

                {category}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="faq-results-heading">
            <div>
              <span className="faq-results-label">HELP CENTRE</span>
              <h3>
                {activeCategory === "All questions"
                  ? "Frequently asked questions"
                  : activeCategory}
              </h3>
            </div>

            <span className="faq-result-count">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "QUESTION" : "QUESTIONS"}
            </span>
          </div>

          <div className="faq-content-layout">
            <div className="faq-accordion-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openItems.includes(faq.originalIndex);

                  return (
                    <article
                      className={`faq-item ${isOpen ? "is-open" : ""}`}
                      key={faq.originalIndex}
                    >
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => toggleItem(faq.originalIndex)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.originalIndex}`}
                      >
                        <span className="faq-question-number">
                          {String(faq.originalIndex + 1).padStart(2, "0")}
                        </span>

                        <span className="faq-question-text">
                          {faq.question}
                        </span>

                        <span className="faq-chevron">
                          <ChevronDown size={18} />
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          className="faq-answer"
                          id={`faq-answer-${faq.originalIndex}`}
                        >
                          <div className="faq-answer-inner">
                            <p>{faq.answer}</p>
                            <span className="faq-answer-category">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <div className="faq-empty-state">
                  <span className="faq-empty-icon">
                    <Search size={24} />
                  </span>

                  <h3>No matching questions</h3>

                  <p>
                    Try a different search term or browse all questions.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="faq-reset-button"
                  >
                    Clear filters <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar contact card */}
            <aside className="faq-sidebar">
              <div className="faq-sidebar-card">
                <span className="faq-sidebar-kicker">
                  <span className="faq-sidebar-status" />
                  STILL HAVE QUESTIONS?
                </span>

                <div className="faq-sidebar-icon">
                  <MessageCircle size={26} strokeWidth={1.5} />
                </div>

                <h3>
                  Let&apos;s make
                  <br />
                  things clearer.
                </h3>

                <p>
                  Every business is different. Tell us what you&apos;re
                  working on and let&apos;s explore the right approach
                  together.
                </p>

                <Link
                  href="/contact"
                  className="faq-sidebar-button"
                >
                  Contact our team
                  <ArrowUpRight size={17} />
                </Link>

                <a
                  href="https://wa.me/14378707083"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-whatsapp-link"
                >
                  <MessageCircle size={17} />
                  Chat with us on WhatsApp
                </a>

                <div className="faq-sidebar-footer">
                  <ShieldCheck size={15} />
                  <span>Personalised guidance for your project</span>
                </div>
              </div>

              <div className="faq-sidebar-mini">
                <span className="faq-mini-icon">
                  <Globe2 size={18} />
                </span>
                <div>
                  <strong>Based in Ottawa, Canada</strong>
                  <span>Working with businesses worldwide</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      
    </main>
  );
}