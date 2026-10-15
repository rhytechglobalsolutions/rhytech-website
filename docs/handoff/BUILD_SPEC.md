# Build Spec — rhytechglobalsolutions.ca Next.js rebuild

Owner: Rhytech Global Solutions Inc. · Contact: Sree (approves all launches)
Repo: rhytechglobalsolutions/rhytech-website · Deploy: Vercel · Domain: rhytechglobalsolutions.ca (stays at GoDaddy until Mar 2028; repoint DNS at cutover)

---

## 1. Sitemap (proposed Next.js App Router routes)

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/products` | Our Products hub (links to the three detail pages) |
| `/rhyvidya` | RhyVidya detail page |
| `/rhyshuttle` | RhyShuttle detail page |
| `/rhyseva` | RhySeva detail page |
| `/contact` | Contact Us (keep `/contact`; add redirect from `/contactus`) |
| `/services` | Services overview (optional — currently services live on the homepage) |
| `/services/[slug]` | Dedicated page per service (recommended — 12 services, see content/homepage.md) |

Keep the existing product URLs (`/rhyvidya`, `/rhyshuttle`, `/rhyseva`) — they are already shared publicly and indexed. Do not nest them under `/products/`.

## 2. Tech requirements

- Next.js App Router + TypeScript + Tailwind CSS
- Markdown/MDX content layer for all page copy (files in `docs/handoff/content/` are the starting point) — non-developers must be able to edit text without touching code
- Node.js runtime on Vercel (API routes for the contact form)
- Contact form posts to an API route that emails info@rhytechglobalsolutions.ca; keep spam protection (reCAPTCHA or Cloudflare Turnstile)
- No "Our Team" section anywhere — Sree's explicit direction. Showcase testimonials, client logos, awards and results instead.

## 3. SEO / GEO / AEO checklist

- [ ] Exactly one H1 per page, matching the page's topic
- [ ] Unique title tag + meta description per page (title names Ontario, Canada as base; meta description carries the worldwide-service message)
- [ ] Semantic heading hierarchy (H1 → H2 → H3, no skipped levels, no duplicated headings)
- [ ] JSON-LD schema: Organization + LocalBusiness (with NAP + hours), FAQPage on product pages, Product/SoftwareApplication on product pages
- [ ] `sitemap.xml` and `robots.txt`
- [ ] `llms.txt` describing the business, services and products for AI crawlers
- [ ] Descriptive alt text on every image (no empty/generic alt)
- [ ] Full footer NAP on every page: Rhytech Global Solutions · 302, 90 Woodridge Crescent, Ottawa, ON K2B 7T1 · +1 (437) 870-7083 · info@rhytechglobalsolutions.ca · hours Mon–Sat 9:00 am–7:00 pm, Sun closed
- [ ] WhatsApp CTA (+1 437 870 7083 → https://wa.me/14378707083) reachable on every page
- [ ] Canonical URLs, Open Graph + Twitter cards
- [ ] Mobile-first responsive; verify no text overlap on small screens

## 4. Brand rules

- Rhytech purple theme throughout. Primary violet ≈ `#7C3AED` (approximate — exact hex could not be extracted from the live site; match the existing brand assets in `rhytech-content/brand/`).
- Logo usage: Rhytech icon + wordmark consistent everywhere. Product logos: RhySeva logo must never mention the company name; RhyShuttle white logo is official (tagline "PLAY • IMPROVE • REPEAT"); RhyVidya logo as supplied.
- No "Our Team" section and no team-photo gallery (Sree's explicit direction).
- Present physical/print marketing alongside digital marketing (standing positioning — e.g. road banners, flyers, spinning prize wheel in portfolio).

## 5. CTA patterns

- Click-to-call: +1 (437) 870-7083 (must render as one unbroken number)
- WhatsApp button → https://wa.me/14378707083 (pre-filled text optional)
- Contact email: info@rhytechglobalsolutions.ca
- Every product page: "Learn more" (detail page) + "Try live" (product site URL) + WhatsApp

## 6. Known issues to fix in the rebuild (2026-10-09 audit)

1. Garbled/duplicated service headings on the homepage (e.g. "Motion Graphics" and "Graphic Design" rendered 3–4 times) — render each service heading exactly once with its correct blurb (pairings in `content/homepage.md`).
2. Weak heading hierarchy / no clear visible H1 in the current markup.
3. Sunday hours widget showed `00:00-00:00` — use "Closed".
4. "Better yet, see us in person!" block appears with no address nearby — always pair with the street address or drop the block.
5. Incomplete footer NAP — use the full footer specified in section 3.
6. Duplicate blog cards (GoDaddy rendering bug — N/A in Next.js, but keep cards deduplicated).
7. Cropped client logos (Robertson Family Dentistry, Drive Insta) — use "fit" image treatment, never crop logos.
8. Nav had duplicate "Contact Us" links (anchor + page) — single Contact link in the rebuild.
9. CTA button label still read "Get Started" while linking to Contact — label CTAs honestly ("Contact Us", "Get a Quote").

## 7. Product pages

Each product gets: hero (logo + tagline + intro), key-points list, "What is …", "How it helps you", "Challenges we fix", 6 FAQs (FAQPage schema), WhatsApp CTA, and links to the live product site. Copy is in `content/rhyvidya.md`, `content/rhyshuttle.md`, `content/rhyseva.md`.

| Product | Tagline | Live site |
|---------|---------|-----------|
| RhyVidya | Knowledge is Power — Learn • Create • Empower | https://rhyvidya-website-rhytechglobalsolutions.vercel.app |
| RhyShuttle | PLAY • IMPROVE • REPEAT | https://rhyshuttle-website-rhytechglobalsolutions.vercel.app (app: https://tcaob-badminton-leaderboard.vercel.app) |
| RhySeva | Care Beyond Borders | https://rhyseva-website-rhytechglobalsolutions.vercel.app |

- RhyVidya: online Hindi teaching platform; Phase 1 teacher Saraswathi; live Google Meet classes; free video library; Beginner/Intermediate/Advanced stages; first month free at launch.
- RhyShuttle: badminton tournament/club software (Rhytech-owned; TCAOB is the pilot customer, not the owner); live scoring, auto brackets, player stats/rankings, session RSVP, venue TV display.
- RhySeva: NRI-to-India services ("your trusted person back home"); launch cities Chennai, Coimbatore, Madurai; verified staff, receipts, live video updates. Spelling: "RhySeva", never "RhySevA".

## 8. Confidentiality (non-negotiable)

Never publish client-confidential figures (ad spend, conversion counts, costs, leads, internal performance data) on the site without that client's explicit written approval. Case studies stay qualitative unless signed off.

## 9. Launch checklist

- [ ] Sree reviews the Vercel preview and approves
- [ ] DNS for rhytechglobalsolutions.ca repointed to Vercel (domain stays registered at GoDaddy)
- [ ] SSL active, all routes return 200
- [ ] Post-launch SEO/GEO/AEO verification pass
