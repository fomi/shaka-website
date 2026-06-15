# Shaka Fuerteventura — Website Changelog

Static HTML/CSS rebuild of shaka-fuerte.com
Stack: plain HTML + CSS, tested via VS Code Live Server. Future host: Netlify.

---

## ROADMAP OVERVIEW

- **Phase 1** — Build core pages in English (index, school, shop, about)
- **Phase 2** — Refinement & consistency across all pages (uniform padding, navbar/footer/topbar, mobile fine-tuning)
- **Phase 3** — Booking/contact system (Web3Forms live key, FareHarbor evaluation)
- **Phase 4** — Multilanguage (EN/ES/IT/DE) — DECIDED: separate static folders (/es/ /it/ /de/), site updated rarely so duplication cost is low; keeps pure HTML, good SEO, no new tooling
- **Phase 5** — Go-live on Netlify, domain repoint, `_redirects` for SEO, schema.org
- **Phase 6** — Post-launch SEO refinement

---

## DONE

### index.html ✓
- Topbar: social icons, scrolling marquee, language switcher (EN/ES/IT/DE)
- Sticky navbar with centered logo (115px) + hamburger drawer on mobile
- **Hero carousel** — 3 slides, autoplay 5.5s, 3 dots, aligned titles (no jump):
  - Slide 1: SHAKA Fuerteventura + Discover (anchor to #explore)
  - Slide 2: Book Your Lesson! → school
  - Slide 3: Book Your Equipment! → shop
- Split panels School / Shop with info boxes (location + opening times), full-width
- **Reviews carousel** — text left + 300×300 photo right, prev/next arrows, 3 real Google reviews
- **Gallery** — 2 photos side by side
- **Contact form** (Web3Forms) — Name, Email, Phone, Message, privacy, centered
- **Instagram grid** — 3×3 placeholders, @shaka_fuerte
- Back-to-top floating button (bottom-right, above WhatsApp, appears on scroll)
- **Carousels touch-swipe enabled (mobile)** — both hero and reviews carousels respond to left/right swipe (40px threshold)
- **Reviews carousel**: arrows removed → replaced with clickable dots (visible on desktop too); autoplay 5.5s (same as hero), pause on hover, reset on swipe/dot
- Footer: logo left, links centered
- WhatsApp floating button (real WA icon)
- Uniform 48px section spacing, white reviews/gallery sections

### school.html ✓
- Same shared chrome (topbar, navbar, footer, drawer, WA float)
- Hero "The School"
- **Intro** "The Shaka Method / Tailored to You" — white bg, bold keywords, no em-dashes
- **Sport choice** — 2 cards (Windsurf / Wingfoil) with photo + description + More info
- **Prices per sport** (cards, not tables):
  - Windsurf: 1 Lesson 75€ / Full Course 190€ (Best value) / Private 95€/h
  - Wingfoil: 1 Lesson 95€ / Full Course 250€ (Best value) / Private 145€/h
- **On-Site Rental** — Windsurf 30€/1h, Wingfoil 45€/1h, detailed sets, swap note + link to Shop
- **SUP & Kayak** — SUP 20€, Kayak single 25€, double 35€, lifejackets included
- Mobile: price cards become compact list rows (label left, price right)
- **Booking form** (Web3Forms) — Name, Email, Mobile, What to book, How many days, How many people, Start date (calendar), Message
- **Gallery** 3×2 placeholders
- **Find Us** — opening times 10:00–17:00 + Google Business map (beach location)

### shop.html ✓
- Same shared chrome
- Hero "The Shop"
- **Intro** "The Shaka Shop / Everything You Need to Ride"
- **How It Works** — 5-step icon strip (numbers in labels, bigger icons): come in shop / choose gear and how long / load car (free roofrack) / ride everywhere / bring back at end of holiday
- **3 big sport cards** (Windsurf / Kitesurf / Wingfoil) — photo + brands + See prices
- **4 mini sport cards** (Surf / Bodyboard & Skimboard / Surf Skate / Bike) — with photos (option A: photo on top)
- **Price cards** — ALL sports converted to single card (featured "1 day" row + multi-day rows) with photo on the right (desktop only, hidden mobile):
  - Windsurf 65€/243/325/455/535 · Kite 85€/280/375/525/620 · Wing 95€/320/445/620/735
  - Surf (Soft/Hard twin columns) · Bodyboard & Skimboard (twin) · Surf Skate · Bike (1 day/extra twin)
- **What's Available boxes** (windsurf/kite/wing) — detailed gear in columns:
  - Windsurf: Sails (Point7 Salt/Slash, Neilpryde Combat HD/Wizard 3.6-5.6m²) + Boards (Flikka wave 80-95L, Flikka freestyle 90-98L, Patrick freeride 83-113L)
  - Kite: Naish Pivot 5-12m² + Duotone 12-14m² · Naish Twintip 145/155/165cm
  - Wing (3 cols): Neilpryde Fly 3.3-5.4 + Dakine Cyclone 2.5-5 · Naish Hover 115/120L + Duotone 75/85/95L · Foils 1000-2000cm²
- Complete set descriptions cleaned (brands removed, now only in What's Available)
- Extras note below price table (windsurf: carbon boom +10€/day, board or sail only 40€/day)
- Bodyboard & Skimboard: single price column (same price for both: 8/30/40/53/70€)
- **Reservation form** "Reserve Your Gear" — Name, Email, Mobile, What sport, How many days, Start date (calendar), "Which equipment do you need?" message field (sizes/board type/weight/level in placeholder)
- **Find Us** — opening times 9:00–15:00 · 18:00–20:00 + Google Business map (shop location)
- **Gallery** 3×2 placeholders

### Mobile drawer menu (all pages) ✓
- Compacted spacing (padding 16→12px, font 22→20px), removed flex:1 gap
- Language links now horizontal row (saves vertical space)
- Fixed social icons not visible: 100dvh + padding-bottom (mobile viewport bug)

### about.html ✓ (text done, team photos pending)
- Same shared chrome (hero now uniform 520px/380px like all pages)
- Hero "About Us"
- **Intro** "Born From a Simple Idea" — Shaka started 5 years ago from Matteo's idea: personal, flexible service free from rigid rental hours, freedom to ride on your own terms
- **Action photo banner** placeholder (between intro and team)
- **Team** "Meet the Team" — intro line (full-time pros, all year round) + 4 cards:
  - Matteo (Owner & Shop Manager) — "CEO, Founder, Venture Capitalist" (joke, to change) — photo added (CEO t-shirt)
  - Giorgio (Windsurf & Wing Teacher) — Lake Garda, first board at 11, teaching since 18
  - Mitch (Windsurf & Wing Teacher) — Slovakia to Fuerteventura, multi-sport
  - Henri (Windsurf & Wing Teacher) — true local, knows the south
- **Locations** (#contact) "Two Spots, One Crew" — 2 side-by-side cards with maps (School beach + Shop C.C. Botánico, locations & hours)
- **Contact form** "Get in Touch / Send Us a Message" — Name, Email, Phone, Subject (free text), Message (general info form)
- **Direct contacts** — WhatsApp +34 679 561 225 + info@shaka-fuerte.com
- "Shaka is Freedom" banner removed for now (CSS kept, may return on photo background)
- Contact link in menu points to about.html#contact (no separate contact page)

### Hero uniformity (all pages) ✓
- All heroes now 520px desktop / 380px mobile (matched to index)
- All hero backgrounds use background6.jpg at center 40% (no jump when navigating)

### Mobile header compacted (all pages) ✓
- Logo reduced 115px → 88px on mobile only (desktop unchanged), nav padding 8px → 6px
- ~20% less header height = more room for content

### Hero carousels on school & shop ✓
- Both pages now have hero carousel (3 slides) like index: slide 1 real photo, slides 2-3 white placeholders (to fill later)
- Fixed title per page (The School / The Shop) stays on all slides, only background changes (no jump)
- Same rules as index: autoplay 5.5s fade, clickable dots, swipe on mobile, pause on hover
- Swipe attached to .hero element (not #heroSlides) so touch works over overlay/content — fix applied to all 3 pages for uniform code

### Back-to-top button (all pages) ✓
- Floating button added to school, shop, about (was only on index) — bottom-right, above WhatsApp, appears after 500px scroll

### Expanded footer (all pages) ✓
- 4-column footer: Logo+tagline · Explore · Contact (with social) · Find Us
- Find Us: two clickable Google Business links (School + Shop) with pin & clock icons, real share.google links
- Bottom row: © 2026 + Privacy/Cookie Policy links (placeholder #)
- Mobile: columns stack, logo+tagline side by side, copyright stacks

### Marquee bar — unified & accessible (all pages) ✓
- Content unified across all pages: Book lesson (→school#book) · Book equipment (→shop#reserve) · 5★ Google · Wind every day!
- Removed: GetYourGuide, Rent&Go, location line, em-dashes
- Accessibility (WCAG 2.2.2): pause on hover/touch, prefers-reduced-motion support, aria-label + role
- CSS verified identical across all 4 pages (hash match)
- Booking sections got scroll-margin-top: 140px so anchor links show title (not hidden under sticky nav)

### Hero text entrance animation (staggered) ✓
- Hero content enters with staggered fade + slide-up cascade: eyebrow → title → line → button/tagline
- Timing: 0.8s each, delays 0.30s / 0.60s / 0.90s / 1.20s (last finishes ~2s, within 5.5s autoplay)
- index: re-animates on EVERY slide change (selector .hero-slide.active .hero-content > *), triggered at load via setTimeout activating slide 1
- school/shop: animates ONCE at page load (selector .hero-content.loaded > *) because title is fixed, content sits outside slides
- Button transition conflict fixed via high-specificity .hero-content > .hero-btn rule (combines entry + hover)
- prefers-reduced-motion respected (text shown immediately)
- about: hero stays static (no carousel, no entrance animation) — left as-is for now

### Scroll reveal on all pages ✓
- Main content sections below hero fade in + slide up (24px) as they enter viewport
- IntersectionObserver, threshold 0.12, once-only, prefers-reduced-motion respected
- Was only on index; now on school, shop, about too

### Hero carousel cleanup (index) ✓
- Removed unused data-first attribute, redundant touchEndX/swipeThreshold vars
- Placeholder inline styles → .hero-ph class (consistent with school/shop)

### CSS SEPARATION — external stylesheet ✓✓ (big refactor)
- All CSS extracted from 4 inline <style> blocks into single css/style.css
- Each page: <link rel="stylesheet" href="css/style.css"> + body class (page-index / page-school / page-shop / page-about)
- Structure: common rules once + 18 legitimate divergences + page-specific rules, all scoped via .page-* class
- Pages shrank from ~800 to 340-615 lines (HTML only)
- BENEFIT: shared components (topbar, footer, nav, forms) now edited in ONE place
- Pre-work: realigned all shared components to be truly identical (index as model, EXCEPT background which is white not index's old beige residue). Fixed micro-derives: cover-line margin, lang-link size, hero-eyebrow min-height, hero-tagline, form label, hero-overlay z-index
- Bugs fixed post-separation:
  1. Comma-separated scoped selectors lost prefix on 2nd part (.page-X a, b) → now each part prefixed
  2. about hero text invisible: global .hero-content > * opacity:0 rule affected about (which has no .loaded/.active to reveal it) → scoped to index/school/shop only
  3. Hero background images not loading: url('images/...') in CSS must be url('../images/...') since CSS lives in css/ subfolder. NOTE: only background-image paths in CSS need ../; <img src> in HTML stay as images/

### Decisions made
- Web3Forms chosen over Formspree (250 vs 50 submissions/month, free)
- Instagram handle corrected to @shaka_fuerte (with underscore)
- SEO redirect strategy: old URLs → homepage initially, refine to anchors later
- Instagram gallery = manual photo grid (no live API)
- Hero carousel timing: keep 5.5s (aligned with best practice 5-7s; faster would hurt readability)
- Update command: when user says "aggiorna changelog" / "update log", refresh this file
- Color identity: site stays neutral (navy/white/black); logo carries the color. Tested coral+teal from logo palette across all pages but reverted — felt forced on the clean editorial layout. Navy #273043 matches the logo's SHAKA lettering, so it already ties in.
- CSS architecture: single css/style.css with .page-* body-class scoping (Strada A). Chosen over per-page CSS files — simplest for a 4-page site, and a clean first step toward Astro if the site grows a lot later.
- Folder convention: css/ subfolder (matches existing images/ and icons/) — more professional than CSS in root.

---

## TODO

### Phase 1 — remaining
- [x] index.html ✓
- [x] school.html ✓
- [x] shop.html ✓
- [x] about.html ✓ (text done; team photos pending)
- **PHASE 1 COMPLETE** (pending only team/action photos)

### Assets to fill (placeholders)
- [ ] index hero carousel: lesson photo + rental photo
- [ ] index Instagram grid: 9 real photos
- [ ] school gallery: 6 photos
- [ ] shop gallery: 6 photos
- [ ] about team photos: Giorgio, Mitch, Henri (Matteo done)
- [ ] about action banner photo (between intro and team)
- [ ] school hero carousel: photos 2 & 3 (slide 1 done)
- [ ] shop hero carousel: photos 2 & 3 (slide 1 done)
- [ ] Review photos already placed (review1-3.jpg)

### Content to verify
- [ ] **Shop "What's Available" — double-check all gear sizes & brands** (windsurf sails/boards, kite, wing wings/boards/foils) — some values may need confirmation
- [x] Remove "4.8★ GetYourGuide" from topbar marquee — done (marquee fully cleaned & unified)

### Phase 2 — refinement
- [x] Add back-to-top floating button to school & shop — done (all pages now)
- [x] Verify topbar/marquee identical on all pages — done (hash-verified)
- [x] Hero carousel pause control — done (pause on hover/touch + prefers-reduced-motion, all pages)
- [x] Footer expanded & unified across all pages — done
- [x] Separate CSS into external css/style.css — done (big refactor, scoped via .page-* class)
- [x] Verify navbar/footer/mobile menu identical on all pages — done (realigned before CSS extraction)
- [ ] Uniform padding (48px) across all pages
- [ ] Mobile fine-tuning at 320px (shop twin-column price cards: check soft/hard readability)
- [ ] Optional: optimize style.css (remove .page-* prefix from rules unique to one page — cosmetic, low priority)
- [ ] Optional: give about hero the same staggered text entrance as school/shop (currently static)

### Performance
- [ ] **Compress shop-windsurf.jpg (12 MB → ~300 KB)** — high priority, hurts mobile load
- [ ] Optimize all other images for web

### Phase 3 — booking/contact
- [ ] Get real Web3Forms access key, replace YOUR_ACCESS_KEY in index + school forms
- [ ] Create Privacy Policy page (GDPR, for form checkbox link)
- [ ] Evaluate FareHarbor integration for live booking

### Phase 4 — multilanguage
- [ ] DECIDED: separate static folders /es/ /it/ /de/ (not Astro — site updated rarely)
- [ ] Do this only when English is final & frozen (translate once on stable content)
- [ ] Duplicate pages into language folders + translate
- [ ] Language switcher links to same page in each folder
- [ ] hreflang tags
- [ ] Consider shared prices.json so price changes don't desync across languages

### Phase 5 — go-live
- [ ] Publish on Netlify
- [ ] Repoint domain shaka-fuerte.com
- [ ] `_redirects` file (old WordPress URLs → new pages)
- [ ] schema.org LocalBusiness structured data

### Phase 6 — post-launch
- [ ] Refine redirects to specific anchors when content justifies
- [ ] Monitor SEO ranking
- [ ] Optional: professional photo/video direction
