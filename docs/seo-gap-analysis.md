# Maitreya Events — SEO gap analysis

Audit of https://maitreyaevents.com (25 Sep 2026): every sitemap page checked for title, description,
canonical, link-preview image, headings, structured data and indexing.

## Fixed in the code

| # | Gap found | Impact | Fix |
|---|---|---|---|
| 1 | Headings read as glued words to Google ("Proof, notpromises", "Momentswe made") | Google indexes misspelled headings | Real spaces between styled heading lines |
| 2 | Every homepage section had **two** H2s (hidden + decorative) | Confusing page outline | Decorative lines are now plain text; one H2 per section |
| 3 | H1s didn't say what the business does ("Weddings", "Every kind of event") | Weakest ranking signal on each page | Keyword H1 on every page ("Wedding Event Management in Chennai"); visuals unchanged |
| 4 | No link-preview image on any page except the homepage | Plain links when shared on WhatsApp / Facebook / LinkedIn | Branded 1200×630 card on every page; event pages use their photo |
| 5 | `www.maitreyaevents.com` served a full duplicate site (200) | Duplicate content, split ranking | Permanent redirect www → maitreyaevents.com |
| 6 | Nine **sample** events (placeholder content) were in the sitemap and indexable | Google could index events that never happened | Sample events are `noindex` and left out of the sitemap until real ones replace them |
| 7 | Titles repeated the brand ("About Maitreya Events \| Maitreya Events") or ran past 60 characters | Truncated / wasted titles in results | Titles rewritten and kept ≈60 characters |
| 8 | Short descriptions on event, terms and privacy pages (44–90 chars) | Google writes its own, weaker snippet | Descriptions extended to 110–160 chars |
| 9 | Business data had name, phone and city only; logo was an SVG | Weaker local / knowledge-panel data | Added contact point, services catalogue, expertise, PNG logo; optional street address + PIN |
| 10 | No Search Console / Bing verification support | Can't confirm ownership or submit the sitemap | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` |
| 11 | No web app manifest or PNG app icon | Missing icon on phones / "Add to home screen" | `manifest.webmanifest` and 180×180 `apple-icon` |
| 12 | Image previews limited | Smaller images in Google results | `max-image-preview: large`, full snippets allowed |

Already in good shape: HTTPS + http→https redirect, robots.txt, XML sitemap, canonical URLs, real 404s,
breadcrumbs (with BreadcrumbList data), FAQ data on the homepage and every service page, Service data per service,
`en-IN` language, fast static pages, alt text on every image, clear internal links.

## Still to do — needs you (these matter most now)

| Priority | Action | Why |
|---|---|---|
| 1 | **Google Business Profile** — create/claim "Maitreya Events", category *Event planner*, same phone, website link, photos | The biggest driver of "event management near me" and Maps results |
| 2 | **Google Search Console** — add `maitreyaevents.com`, verify, submit `https://maitreyaevents.com/sitemap.xml` | See what Google indexes, fix errors, track keywords |
| 3 | **Real photos** of your own events in `/public/images` | Stock photos appear on thousands of sites; your own images rank in Google Images and build trust |
| 4 | **Real case studies** — replace the sample events in `data/events.ts` (remove `sample: true`) | Unique, provable content — the best long-term SEO asset |
| 5 | **Genuine reviews** — ask happy clients to review on Google; add quotes to `data/testimonials.ts` | Reviews drive local ranking and conversions |
| 6 | **Street address + PIN** in the server env (if you have an office clients may visit) | Stronger local signals (must match the Business Profile exactly) |
| 7 | **Social profile links** in the server env | Connects your brand across Google |
| 8 | **Longer service pages** (500–800 words each: venues you work at, past examples, pricing guidance) | Service pages currently have 220–350 words |
| 9 | **Listings** — JustDial, Sulekha, WedMeGood, Shaadisaga, Google Maps; same name/phone everywhere | Local citations and backlinks |
| 10 | **Google Analytics** — add `NEXT_PUBLIC_GA_ID` | Measure enquiries from search |

## Server env keys added

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=   # from Search Console → HTML tag (content value only)
NEXT_PUBLIC_BING_SITE_VERIFICATION=     # optional
NEXT_PUBLIC_ADDRESS_STREET=             # optional, e.g. 12, First Main Road, Adyar
NEXT_PUBLIC_ADDRESS_POSTAL_CODE=        # optional, e.g. 600020
```

Edit `/opt/maitreya/shared/.env` on the server, then redeploy.
