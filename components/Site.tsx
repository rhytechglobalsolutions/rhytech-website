import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  Sparkles,
  Workflow,
  Database,
  Smartphone,
  Palette,
  Search,
  Cloud,
  PenTool,
  ChartNoAxesCombined,
  Boxes,
  FileCheck2,
  Video,
  type LucideIcon,
} from "lucide-react";
import { site, services, products } from "@/lib/content";
const icons: LucideIcon[] = [
  Code2,
  Globe2,
  Smartphone,
  Database,
  Video,
  Cloud,
  Search,
  ChartNoAxesCombined,
  Layers3,
  Palette,
  FileCheck2,
  Boxes,
];

export function WhatsApp() {
  return (
    <a
      className="whatsapp"
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Rhytech on WhatsApp"
    >
      <MessageCircle /> WhatsApp us
    </a>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      {children}
     
      <WhatsApp />
    </>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s, i) => {
        const Icon = icons[i % icons.length];
        return (
          <article className="service-card" key={s.slug}>
            <div className="service-icon">
              <Icon size={21} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <Link className="text-link" href={`/services/${s.slug}`}>
              Explore service <ArrowRight size={15} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
export function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((p, i) => (
        <article className="product-card" key={p.slug}>
          <div className="product-logo-panel"><img className="product-logo" src={p.logo} alt={`${p.title} logo`} loading="lazy" /></div>
          <h3>{p.title}</h3>
          <div className="tagline">{p.tagline}</div>
          <p>{p.description}</p>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginTop: "auto",
              paddingTop: 15,
            }}
          >
            <Link className="text-link" href={`/products/${p.slug}`}>
              Learn more <ArrowRight size={15} />
            </Link>
            <a className="text-link" href={p.ctaUrl} target="_blank" rel="noreferrer">{p.ctaLabel} <ArrowUpRight size={14} /></a>
          </div>
        </article>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <div className="cta-band">
      <div>
        <Eyebrow>Let’s build what’s next</Eyebrow>
        <h2>Have a challenge worth solving?</h2>
        <p>
          Tell us where you want to go. We’ll help you identify the right next
          step, whether it’s a new digital experience, a smarter system or
          stronger visibility.
        </p>
      </div>
      <Link className="btn" href="/contact">
        Contact us <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
export function Checks({ items }: { items: readonly string[] | string[] }) {
  return (
    <div className="check-list">
      {items.map((x) => (
        <div className="check-item" key={x}>
          <span className="check">
            <Check size={14} />
          </span>
          <div>
            <strong>{x}</strong>
            <p>Planned around your goals, users and operational needs.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
