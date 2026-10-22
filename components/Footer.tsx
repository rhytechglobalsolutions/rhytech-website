
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Globe2,
  Sparkles,
} from "lucide-react";

import { site } from "@/lib/site";
import { services } from "@/lib/content";

const products = [
  {
    name: "RhyVidya",
    href: "/products/rhyvidya",
    tagline: "Learn · Create · Empower",
  },
  {
    name: "RhyShuttle",
    href: "/products/rhyshuttle",
    tagline: "Play · Improve · Repeat",
  },
  {
    name: "RhySeva",
    href: "/products/rhyseva",
    tagline: "Care Beyond Borders",
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/rhytechglobalsolutions/",
    icon: "/icons/white/instagram.svg",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576907321425",
    icon: "/icons/white/facebook.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/rhytech-global-solutions/",
    icon: "/icons/white/linkedin.svg",
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@rhytechglobalsolutions",
    icon: "/icons/white/threads.svg",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@RhytechGlobalSolutionsInc",
    icon: "/icons/white/youtube.svg",
  },
];

const companyLinks = [
  { label: "About Rhytech", href: "/about" },
  { label: "Insights & Resources", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
];

const serviceHref = "/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[#100B1C] text-white">

      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 -top-32 -z-10 h-[480px] w-[480px] rounded-full bg-violet-700/[0.14] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/[0.12] blur-[150px]"
      />

      <div className="container">

        {/* Premium CTA banner */}
        <section className="relative overflow-hidden border-b border-white/[0.09] py-16 sm:py-20 lg:py-24">

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-violet-300/[0.10] sm:h-96 sm:w-96"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-violet-300/[0.10] sm:h-72 sm:w-72"
          />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div className="max-w-2xl">

              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/[0.18] bg-violet-400/[0.07] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.19em] text-violet-300">
                <Sparkles size={13} />
                Your next chapter starts here
              </span>

              <h2 className="mt-6 text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-white">
                Have a vision?
                <span className="mt-1 block bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Let&apos;s make it matter.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                From digital experiences to connected business systems,
                let&apos;s create thoughtful technology that moves your
                business forward.
              </p>

            </div>

            <div className="relative flex shrink-0 flex-wrap gap-3">

              <Link
                href="/contact"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 text-sm font-bold text-white shadow-xl shadow-violet-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-600"
              >
                Start a project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-5 text-sm font-semibold text-white/85 transition duration-300 hover:border-violet-300/40 hover:bg-white/[0.08] hover:text-white"
              >
                <MessageCircle size={16} />
                WhatsApp us
              </a>

            </div>
          </div>
        </section>

        {/* Main footer */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4">

            <Link
              href="/"
              aria-label="Rhytech Global Solutions home"
              className="inline-flex items-center rounded-lg transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.webp"
                alt="Rhytech Global Solutions"
                width={240}
                height={120}
                className="h-20 w-auto object-contain object-left"
                priority={false}
              />
            </Link>

            <p className="mt-6 max-w-sm text-[13px] leading-7 text-white/55">
              Empowering businesses through digital transformation,
              thoughtful design and connected technology. Built around
              your business, your people and the outcomes that matter.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Rhytech Global Solutions on ${social.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] transition duration-200 hover:border-violet-300/40 hover:bg-violet-500/15"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={social.icon}
                    alt=""
                    width={16}
                    height={16}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
            >
              Talk to our team
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/40">
              <Globe2 size={14} className="text-violet-300/80" />
              Ontario, Canada
              <span className="text-white/20">·</span>
              Serving clients worldwide
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">

            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">
              Explore
            </h3>

            <ul className="mt-6 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[13px] text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">

            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">
              Our Services
            </h3>

            <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
              {services.slice(0,7).map((service) => (
                <li key={service.title}>
                  <Link
                    href={serviceHref}
                    className="text-[13px] leading-6 text-white/65 transition-colors duration-200 hover:text-violet-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-violet-300 transition-colors hover:text-white"
            >
              Explore all services
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">

            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">
              Get in Touch
            </h3>

            <div className="mt-6 space-y-3">

              <a
                href={`mailto:${site.email}`}
                className="group flex items-start gap-3 text-[13px] text-white/65 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-violet-300 transition duration-200 group-hover:border-violet-300/30 group-hover:bg-violet-500/10">
                  <Mail size={15} />
                </span>
                <span className="min-w-0 break-all pt-2">
                  {site.email}
                </span>
              </a>

              <a
                href={`tel:${site.phoneHref}`}
                className="group flex items-start gap-3 text-[13px] text-white/65 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-violet-300 transition duration-200 group-hover:border-violet-300/30 group-hover:bg-violet-500/10">
                  <Phone size={15} />
                </span>
                <span className="pt-2">{site.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-[13px] leading-6 text-white/65">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-violet-300">
                  <MapPin size={15} />
                </span>
                <address className="pt-1 not-italic">
                  {site.name}
                  <br />
                  {site.location}
                </address>
              </div>

            </div>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-xs font-bold text-white/80 transition-colors hover:text-violet-300"
            >
              View contact details
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Product ecosystem */}
        <div className="border-y border-white/[0.08] py-7 sm:py-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                The Rhytech ecosystem
              </p>

              <p className="mt-2 text-xs leading-6 text-white/50">
                Purpose-built digital experiences for everyday challenges.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">

              {products.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 transition duration-300 hover:border-violet-300/25 hover:bg-white/[0.05]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-300/[0.12] bg-violet-400/[0.07] text-violet-300">
                    <ArrowUpRight size={15} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-white/85 transition-colors group-hover:text-violet-300">
                      {product.name}
                    </span>
                    <span className="mt-1 block text-[10px] leading-4 text-white/40">
                      {product.tagline}
                    </span>
                  </span>
                </Link>
              ))}

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col justify-between gap-4 py-6 text-[11px] text-white/40 sm:flex-row sm:items-center">

          <p>
            © {currentYear} Rhytech Global Solutions Inc. All rights reserved.
          </p>

          <p className="tracking-wide">
            Technology with purpose. Progress by design.
          </p>

        </div>
      </div>
    </footer>
  );
}