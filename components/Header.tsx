
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Menu,
  Monitor,
  Palette,
  Search,
  Smartphone,
  Sparkles,
  X,
  Zap,
  HeartHandshake,
  Trophy,
  Globe2,
  ShieldCheck,
  Workflow,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/14378707083";

const services: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Software Development",
    description: "Custom digital products built to scale.",
    href: "/services/software-development",
    icon: Code2,
  },
  {
    title: "Website Design",
    description: "High-performing websites that convert.",
    href: "/services/website-design",
    icon: Monitor,
  },
  {
    title: "Mobile Applications",
    description: "Intuitive iOS and Android experiences.",
    href: "/services/mobile-applications",
    icon: Smartphone,
  },
  {
    title: "Cloud Services",
    description: "Secure, scalable cloud infrastructure.",
    href: "/services/cloud-services",
    icon: Cloud,
  },
  {
    title: "SEO, GEO & AEO",
    description: "Get discovered across search and AI.",
    href: "/services/seo-geo-aeo",
    icon: Search,
  },
  {
    title: "Digital Marketing",
    description: "Campaigns designed for measurable growth.",
    href: "/services/digital-marketing",
    icon: Zap,
  },
  {
    title: "UX/UI Design",
    description: "Thoughtful interfaces and better journeys.",
    href: "/services/ux-ui-design",
    icon: Layers3,
  },
  {
    title: "Graphic Design",
    description: "Distinctive brand and visual identities.",
    href: "/services/graphic-design",
    icon: Palette,
  },
  {
    title: "Data Migration",
    description: "Reliable transitions between systems.",
    href: "/services/data-migration",
    icon: Database,
  },
  {
    title: "Motion Graphics",
    description: "Bring your brand story to life.",
    href: "/services/motion-graphics",
    icon: Sparkles,
  },
  {
    title: "ERP Systems",
    description: "Connected business operations.",
    href: "/services/erp-systems",
    icon: Workflow,
  },
  {
    title: "Data Entry",
    description: "Accurate, organized business data.",
    href: "/services/data-entry",
    icon: Database,
  },
];

const products: {
  name: string;
  tagline: string;
  description: string;
  href: string;
  external: string;
  icon: LucideIcon;
  symbol: string;
}[] = [
  {
    name: "RhyVidya",
    tagline: "Knowledge is Power",
    description: "Online Hindi learning and live classes.",
    href: "/products/rhyvidya",
    external:
      "https://rhyvidya-website-rhytechglobalsolutions.vercel.app",
    icon: GraduationCap,
    symbol: "01",
  },
  {
    name: "RhyShuttle",
    tagline: "PLAY · IMPROVE · REPEAT",
    description: "Badminton club and tournament management.",
    href: "/products/rhyshuttle",
    external:
      "https://www.rhyshuttle.ca",
    icon: Trophy,
    symbol: "02",
  },
  {
    name: "RhySeva",
    tagline: "Care Beyond Borders",
    description: "Trusted services for families back home.",
    href: "/products/rhyseva",
    external:
      "https://rhyseva-website-rhytechglobalsolutions.vercel.app",
    icon: HeartHandshake,
    symbol: "03",
  },
];

const companyLinks = [
  {
    title: "About Rhytech",
    description: "Our approach to digital transformation.",
    href: "/about",
    icon: Globe2,
  },
  {
    title: "Insights",
    description: "Ideas, guides and technology perspectives.",
    href: "/insights",
    icon: Sparkles,
  },
  {
    title: "Contact",
    description: "Let's discuss your next project.",
    href: "/contact",
    icon: MessageCircle,
  },
];

type MenuName = "services" | "products" | "company" | null;

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileProductsOpen(false);
    setMobileCompanyOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!activeMenu && !mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [activeMenu, mobileOpen]);

  function toggleMenu(menu: Exclude<MenuName, null>) {
    setActiveMenu((current) => (current === menu ? null : menu));
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 text-white"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Brand accent */}
        {/* <div className="h-[3px] bg-gradient-to-r from-violet-700 via-purple-500 to-fuchsia-400" /> */}

        {/* Main navigation */}
        <div className="relative border-b border-white/[0.09] bg-[#1A1028]/[0.97] shadow-[0_8px_30px_rgba(15,7,29,0.12)] backdrop-blur-2xl">
          <div className="mx-auto flex h-[76px] container items-center justify-between lg:h-[84px]">
            {/* Official logo */}
            <Link
              href="/"
              aria-label="Rhytech Global Solutions home"
              className="flex shrink-0 items-center rounded-lg outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-violet-400"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Image
                src="/logo.webp"
                width={190}
                height={100}
                alt="Rhytech Global Solutions"
                priority
                className="h-[48px] w-auto object-contain sm:h-[64px]"
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden h-full items-center gap-1 lg:flex"
            >
               <Link
                href="/"
                onMouseEnter={() => setActiveMenu(null)}
                className="rounded-full px-4 py-3 text-[13px] font-semibold text-white/75 transition hover:bg-white/[0.07] hover:text-white"
              >
                Home
              </Link>
              <DesktopMenuButton
                label="Services"
                active={activeMenu === "services"}
                onClick={() => toggleMenu("services")}
              />
              <DesktopMenuButton
                label="Products"
                active={activeMenu === "products"}
                onClick={() => toggleMenu("products")}
              />
              <DesktopMenuButton
                label="Company"
                active={activeMenu === "company"}
                onClick={() => toggleMenu("company")}
              />

              <Link
                href="/faqs"
                onMouseEnter={() => setActiveMenu(null)}
                className="rounded-full px-4 py-3 text-[13px] font-semibold text-white/75 transition hover:bg-white/[0.07] hover:text-white"
              >
                Faqs
              </Link>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-5 lg:flex">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveMenu(null)}
                className="text-[12px] font-semibold text-white/65 transition hover:text-violet-300 xl:block"
              >
                Talk to an expert
              </a>

              <Link
                href="/contact"
                onMouseEnter={() => setActiveMenu(null)}
                className="group inline-flex h-[46px] items-center gap-3 rounded-full border border-violet-300/20 bg-gradient-to-r from-violet-600 to-purple-600 px-5 text-[12px] font-bold text-white shadow-[0_8px_30px_rgba(124,58,237,0.25)] transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-600 hover:shadow-[0_12px_35px_rgba(124,58,237,0.35)]"
              >
                Get a Quote
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((current) => !current);
                setActiveMenu(null);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition hover:border-violet-400/60 hover:bg-violet-500/15 lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop mega menus */}
          <div
            className={`absolute left-0 right-0 top-full hidden border-b border-violet-100/10 bg-[#211432] shadow-[0_30px_70px_rgba(12,5,23,0.35)] transition-all duration-200 lg:block ${
              activeMenu
                ? "visible translate-y-0 opacity-100"
                : "pointer-events-none invisible -translate-y-2 opacity-0"
            }`}
            aria-hidden={!activeMenu}
          >
            {activeMenu === "services" && (
              <div className="mx-auto container py-8 xl:py-10">
                <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-10">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-700/35 via-[#2b1940] to-[#1b1029] p-7">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
                    <span className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                      Our capabilities
                    </span>
                    <h2 className="relative mt-5 text-[27px] font-semibold leading-[1.2] tracking-[-0.045em] text-white">
                      Technology built around your business.
                    </h2>
                    <p className="relative mt-4 text-[13px] leading-6 text-white/60">
                      From strategy and design to development and growth,
                      build the right digital foundation.
                    </p>
                    <Link
                      href="/services"
                      tabIndex={0}
                      className="relative mt-7 inline-flex items-center gap-2 text-[12px] font-bold text-violet-300 transition hover:text-white"
                    >
                      Explore all services
                      <ArrowRight size={14} />
                    </Link>
                    <div className="relative mt-7 h-px bg-white/10" />
                    <p className="relative mt-4 text-[10px] tracking-[0.12em] text-white/40">
                      STRATEGY · DESIGN · ENGINEERING
                    </p>
                  </div>

                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
                        Explore our services
                      </p>
                      <span className="text-[11px] text-white/35">
                        12 specialist services
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                      {services.map((service) => {
                        const Icon = service.icon;

                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            tabIndex={activeMenu ? 0 : -1}
                            className="group flex min-w-0 items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-white/[0.08] hover:bg-white/[0.05]"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-400/[0.10] text-violet-300 transition group-hover:border-violet-300/25 group-hover:bg-violet-500/20">
                              <Icon size={18} strokeWidth={1.7} />
                            </span>
                            <span className="min-w-0 pt-0.5">
                              <span className="block text-[12px] font-bold leading-5 text-white/90 transition group-hover:text-violet-300">
                                {service.title}
                              </span>
                              <span className="mt-1 block text-[11px] leading-[1.6] text-white/45">
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "products" && (
              <div className="mx-auto container py-9">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Built by Rhytech
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                      Products designed for real-world impact.
                    </h2>
                  </div>
                  <Link
                    href="/products"
                    className="text-[11px] font-semibold text-white/55 transition hover:text-violet-300"
                  >
                    View all products →
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  {products.map((product) => {
                    const Icon = product.icon;

                    return (
                      <article
                        key={product.name}
                        className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-400/10 text-violet-300">
                            <Icon size={21} strokeWidth={1.7} />
                          </span>
                          <span className="text-[11px] font-bold tracking-[0.15em] text-white/25">
                            {product.symbol}
                          </span>
                        </div>

                        <h3 className="mt-5 text-[19px] font-bold tracking-[-0.04em] text-white">
                          {product.name}
                        </h3>
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-violet-300">
                          {product.tagline}
                        </p>
                        <p className="mt-3 text-[12px] leading-6 text-white/50">
                          {product.description}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4">
                          <Link
                            href={product.href}
                            tabIndex={activeMenu ? 0 : -1}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90 transition hover:text-violet-300"
                          >
                            Learn more
                            <ArrowRight size={13} />
                          </Link>
                          <a
                            href={product.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={activeMenu ? 0 : -1}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/50 transition hover:text-violet-300"
                          >
                            Try live
                            <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {activeMenu === "company" && (
              <div className="mx-auto container py-9">
                <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Get to know us
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                      Your partner in progress.
                    </h2>
                    <p className="mt-3 text-[13px] leading-6 text-white/50">
                      Discover our approach, explore our thinking, and start
                      a conversation about your goals.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {companyLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          tabIndex={activeMenu ? 0 : -1}
                          className="group rounded-xl border border-white/[0.09] bg-white/[0.025] p-5 transition hover:border-violet-400/30 hover:bg-white/[0.06]"
                        >
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                            className="text-violet-300"
                          />
                          <h3 className="mt-4 text-sm font-bold text-white group-hover:text-violet-300">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-xs leading-5 text-white/50">
                            {item.description}
                          </p>
                          <ArrowUpRight
                            size={17}
                            className="mt-5 text-violet-300 transition group-hover:translate-x-1 group-hover:translate-y-1"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-[#10091B]/75 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-[430px] flex-col overflow-y-auto border-l border-violet-300/10 bg-[#1A1028] text-white shadow-2xl">
            <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
              <Link
                href="/"
                aria-label="Rhytech Global Solutions home"
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/logo.webp"
                  width={160}
                  height={85}
                  alt="Rhytech Global Solutions"
                  className="h-11 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
              >
                <X size={19} />
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="flex-1 px-6 py-6"
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                Explore Rhytech
              </p>

              <MobileAccordion
                title="Services"
                open={mobileServicesOpen}
                onToggle={() =>
                  setMobileServicesOpen((current) => !current)
                }
              >
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-bold text-violet-300 hover:bg-white/[0.06]"
                >
                  All services →
                </Link>
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {service.title}
                  </Link>
                ))}
              </MobileAccordion>

              <MobileAccordion
                title="Products"
                open={mobileProductsOpen}
                onToggle={() =>
                  setMobileProductsOpen((current) => !current)
                }
              >
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-bold text-violet-300 hover:bg-white/[0.06]"
                >
                  All products →
                </Link>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-3 transition hover:bg-white/[0.06]"
                  >
                    <span className="block text-sm font-bold text-white">
                      {product.name}
                    </span>
                    <span className="mt-1 block text-xs text-white/50">
                      {product.description}
                    </span>
                  </Link>
                ))}
              </MobileAccordion>

              <MobileAccordion
                title="Company"
                open={mobileCompanyOpen}
                onToggle={() =>
                  setMobileCompanyOpen((current) => !current)
                }
              >
                {companyLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </MobileAccordion>

              <Link
                href="/insights"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-white/10 py-5 text-base font-semibold text-white/90 transition hover:text-violet-300"
              >
                Insights
              </Link>
            </nav>

            <div className="shrink-0 border-t border-white/10 bg-white/[0.025] p-6">
              <p className="mb-4 text-xs leading-5 text-white/50">
                Have a project in mind? Let&apos;s explore what&apos;s
                possible.
              </p>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-500 hover:to-fuchsia-600"
              >
                Get a Quote
                <ArrowUpRight size={16} />
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-white/60 transition hover:text-violet-300"
              >
                <MessageCircle size={15} />
                Talk to us on WhatsApp
                <ArrowUpRight size={13} />
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function DesktopMenuButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={active}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-semibold transition ${
        active
          ? "bg-white/[0.09] text-violet-300"
          : "text-white/75 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      {label}
      <ChevronDown
        size={14}
        className={`transition-transform duration-200 ${
          active
            ? "rotate-180 text-violet-300"
            : "text-white/45 group-hover:text-violet-300"
        }`}
      />
    </button>
  );
}

function MobileAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-base font-semibold text-white/90 transition hover:text-violet-300"
      >
        {title}
        <ChevronDown
          size={17}
          className={`text-violet-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-1 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
