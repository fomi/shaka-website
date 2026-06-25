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

### SESSION 2026-06-20 — Photos, mobile polish, school CTA & FAQ ✓✓

**Real photographer photos inserted (optimized via PIL, all web-sized):**
- index: hero slide 2 (lesson); reviews 1-4 with real photos + 4th review (rental) added; Instagram 9 real photos. Index 2-photo gallery REMOVED.
- school: hero carousel all 3 slides (Costa Calma / smiling wing / group + safety boat); gallery 6 photos; sport cards 2 (windsurf + wing, wing cropped to center subjects)
- shop: hero carousel all 3 slides (shop interior / kite aerial / windsurf wave) — slide 1 is user-cropped interior photo, replaced generic background6; gallery 6 photos (aerial / windsurf / wingfoil / SUP / kite / sunset). NOTE: GAB_7628 + GAB_1351 used in both hero and gallery (intentional)
- about: action-banner photo placeholder REMOVED entirely (HTML + CSS) per decision
- Image optimization recipe: PIL convert RGB, resize LANCZOS, quality 82-84. Hero 1600px, gallery 900px, sport-card 1000px, review/insta 600/500px square. CSS bg paths need ../images/, inline HTML & img src use images/

**Mobile fixes:**
- index split (School/Shop) now stacks (grid 1fr); booking forms compacted; hamburger drawer closes on same-page anchors + animated close before cross-page nav
- index split compacting + info-box alignment (location/opening icons align with text)

**index Location + SEO buttons:**
- Location info-boxes now clickable → Google Maps (School + Shop)
- sp-btn texts: "Windsurf & Wing Lessons" / "Windsurf & Kite Rental" (was generic)

**Reviews carousel → FADE:** changed from horizontal slide to opacity fade; reviews square photo, compacted mobile

**Review/price reveal:** scroll reveal added to all price card sections

**Hero overlay tuning:** mobile fades to full white at bottom; desktop lighter (0.85). All 3 hero carousels

**Footer hours:** Shop hours split to two lines (9:00–15:00 / 18:00–20:00, morning above evening below) in footer of ALL 4 pages. School stays one line. About internal section unchanged. NOTE: footer HTML duplicated per page (static site), only CSS shared — content edits need all 4 files

**school — Best Value badge:**
- Now visible on mobile (was display:none); desktop +~22% bigger, mobile +25% bigger and moved ABOVE "Full Course" (via order:-1 in flex card-text)
- Badge moved inside card-text in HTML (both featured cards)

**school — sport-card buttons SEO:** "More info" → "Windsurf Lessons & Prices" / "Wingfoil Lessons & Prices"

**school — CTA buttons (NEW):** "Book Your Windsurf/Wingfoil Lesson" at end of each price section → scrolls to #book form AND pre-selects the matching course in the dropdown (data-course + JS). Navy #273043, centered

**school — FAQ accordion (NEW):** 6-question fisarmonica before booking form (experience / equipment / group size / languages [EN/IT/DE/ES/CZ/SK/PL] / min age [windsurf 8, wing 10, privates for younger] / no-wind [reschedule or 100% refund]). Smooth max-height animation, +/× icon. JSON-LD FAQPage schema in <head> for SEO rich snippets. id="faq" anchor + scroll-margin-top

**school — booking form intro:** now links to WhatsApp (wa.me/34679561225, new tab) and FAQ (#faq anchor). booking-link style navy underline, hover WhatsApp green

### SESSION 2026-06-25 — Image optimization, icons, hero photos, UI consistency ✓✓

**Image optimization & new photos (PIL, web-sized, all + WebP for Phase 2):**
- shop-windsurf.jpg recompressed 12 MB → 91 KB (1600px)
- shop-skate.jpg NEW skate card photo (153 KB, 1600px)
- shop-gallery6.jpg replaced with Costa Calma sunset
- hero-sunset.jpg NEW for index hero slide 1 (2560px, 222 KB) — replaces background6; legibility tested (black text + white fade) at background-position center 40%
- shop-interior.jpg NEW real shop interior, used in index slide 3 AND shop slide 1 (2200px, 477 KB, under 500KB hero target); background-position center 50%
- team-henri.jpg about team photo (600×600, user-cropped square)
- shop-bike.jpg replaced with new e-bike couple photo (1600px, 144 KB) — updates both mini-card (16/10) and price-photo (3/2)
- WebP files exported alongside but NOT yet wired via <picture> (deferred to Phase 2 global optimization)

**Icons (black-circle white-art recipe, 4× SS, 512px PNG):**
- icon_fashion.png NEW (t-shirt) — added "Fashion" pill to index shop section
- icon_kayak.png NEW — fixes index school Kayak pill that wrongly used icon_bodyboard.png
- Recipe note: art_scale ~0.51–0.64; optional stroke thickening via distance-transform-calibrated dilation (e.g. fashion icon +20%)

**index hero buttons (SEO, de-duplicated vs slide titles):**
- Slide 2: "Discover the School" → "Windsurf & Wingfoil Lessons"
- Slide 3: "Discover the Shop" → "Windsurf, Kitesurf & Wingfoil Rental"

**Terminology standardized "Wing" → "Wingfoil":** index hero + sp-btn, school gallery alt, about 3 team roles. Shop gear categories "Wings"/"Kites" left as-is (equipment names, not disciplines)

**find-us WhatsApp (school + shop):** icon solid-fill → outline (matches clock/pin); value restyled from underlined navy inline-link to navy + chevron, white-space nowrap, hover shifts chevron (clickable, mobile-safe)

**CSS consistency:**
- shop .price-photo: aspect-ratio 3/2 uniform; .price-row-layout align-items flex-start (desktop, photos stop stretching to table height) / stretch (mobile, fixes half-width card bug)
- Hero dots pointer-events:none on mobile (swipe handles nav; dots remain as indicator)
- Hero button mobile: font 15px / letter-spacing 1px / padding 11px 18px (fixes wrap on S24+/360px)
- CTA buttons unified to navy: sp-btn / sport-btn / form-submit / hero-btn → #273043 base, #1a212f hover (matches cta-btn). Brand black #111 untouched (footer, accent lines, carousel/review dots, badges, icon circles, hamburger, totop)
- .info-val a: navy + chevron + nowrap

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
- Instagram grid: all 9 cells link to profile instagram.com/shaka_fuerte (not individual posts — simpler, no broken links if a post is deleted/archived). Considered linking each thumbnail to its specific post/reel but rejected for maintenance simplicity.
- about action banner: REMOVED for good (HTML + CSS) — decided it's not needed, page flows intro → team directly.
- school CTA + FAQ: added a conversion layer to the school page (CTA buttons that pre-fill the booking form + FAQ accordion with SEO schema). FAQ schema kept on school page only (where the FAQs live).
- shop hero slide 1: user-cropped vertical interior photo to 16:9 horizontal — interior shot opens the shop hero (shows all the gear), then action shots follow.
- hero button text (2026-06-25): keep buttons descriptive but distinct from slide titles (titles say "Book Your..."); use full sport terms windsurf/kitesurf/wingfoil over abbreviations for SEO even though slide 3 then duplicates the section anchor below — keyword correctness beats avoiding a low-value duplicate anchor.
- button color (2026-06-25): unify all CTAs/submits to navy (#273043 → #1a212f hover); black #111 reserved for brand chrome only (footer, dots, badges, icon circles, hamburger, totop). Black was not carrying hierarchy — the main cta-btn was already navy.
- find-us WhatsApp link (2026-06-25): navy + chevron (footer "Contact ›" language) instead of underlined navy bold, which clashed with the plain info values. nowrap added so it never breaks on mobile.

---

## TODO

### Phase 1 — remaining
- [x] index.html ✓
- [x] school.html ✓
- [x] shop.html ✓
- [x] about.html ✓ (text done; team photos pending)
- **PHASE 1 COMPLETE** (pending only team/action photos)

### Assets to fill (placeholders)
- [x] index hero carousel: all 3 slides done ✓ (slide 1 sunset, slide 2 lesson, slide 3 shop interior)
- [x] index Instagram grid: 9 real photos ✓
- [x] school gallery: 6 photos ✓
- [x] shop gallery: 6 photos ✓
- [ ] about team photos: Giorgio, Mitch pending (Matteo + Henri done)
- [x] about action banner photo — REMOVED entirely (decision, no longer needed)
- [x] school hero carousel: all 3 slides ✓
- [x] shop hero carousel: all 3 slides ✓ (slide 1 = cropped interior photo)
- [x] Review photos placed (review1-4.jpg) ✓
- [x] index hero slide 1 (sunset) & slide 3 (shop interior) done ✓
- [ ] about hero → convert to 3-slide carousel (new requirement from Shaka-Pic.pdf)

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
