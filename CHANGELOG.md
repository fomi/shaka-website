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
- **Find Us** — opening times 9:00–15:00 · 18:00–20:00 + Google Business map (shop location)
- **Gallery** 3×2 placeholders

### Mobile drawer menu (all pages) ✓
- Compacted spacing (padding 16→12px, font 22→20px), removed flex:1 gap
- Language links now horizontal row (saves vertical space)
- Fixed social icons not visible: 100dvh + padding-bottom (mobile viewport bug)

### Decisions made
- Web3Forms chosen over Formspree (250 vs 50 submissions/month, free)
- Instagram handle corrected to @shaka_fuerte (with underscore)
- SEO redirect strategy: old URLs → homepage initially, refine to anchors later
- Instagram gallery = manual photo grid (no live API)
- Hero carousel timing: keep 5.5s (aligned with best practice 5-7s; faster would hurt readability)
- Update command: when user says "aggiorna changelog" / "update log", refresh this file

---

## TODO

### Phase 1 — remaining
- [ ] **about.html** — team (Giorgio, Mitch, Henri, Matteo, Gabor?), story, two locations, contacts, map

### Assets to fill (placeholders)
- [ ] index hero carousel: lesson photo + rental photo
- [ ] index Instagram grid: 9 real photos
- [ ] school gallery: 6 photos
- [ ] shop gallery: 6 photos
- [ ] Review photos already placed (review1-3.jpg)

### Phase 2 — refinement
- [ ] Add back-to-top floating button to school & shop (consistency)
- [ ] Uniform padding (48px) across all pages
- [ ] Verify navbar/footer/topbar/mobile menu identical on all pages
- [ ] Mobile fine-tuning at 320px (shop twin-column price cards: check soft/hard readability)
- [ ] Footer links spacing on mobile (school/shop)
- [ ] Hero carousel: consider pause control (autoplay >5s, no hover-pause on mobile = accessibility)

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
