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

### SESSION 2026-06-26 — Legal pages, cookie-safe maps, SEO meta, favicon ✓✓

**Legal pages created (privacy.html, terms.html, cookie.html):**
- Same chrome as about (topbar/nav/hero/footer/drawer); centered `.legal` content, max-width 860px, readable typography (Bebas h2, navy h3, Barlow body)
- Content from user's PRIVACY_POLICY.docx + TERMS___CONDITIONS.docx, converted to clean HTML (numbered sections, lists, highlighted company-data box)
- Real company data filled everywhere: **Shaka Fuerte SL · NIF B72638240 · Calle Alcalde Alonso Patallo, 1, 35600 Puerto Del Rosario, Las Palmas · info@shaka-fuerte.com · +34 679 561 225 · Last Updated 26/06/2026**
- Footer legal links wired on ALL pages: Privacy Policy → privacy.html, Terms → terms.html, Cookie Policy → cookie.html (replaced old "#" + "Cookie Policy" placeholder)
- Legal text compacted (tighter h2/p/li margins) per user request; end disclaimer note removed
- Footer bug fixed: legal pages initially used `.footer-cols` (no CSS) → corrected to `.footer-top` grid (identical to other pages)

**Google Maps → click-to-load (cookie compliance, "Approach B"):**
- Replaced 4 Maps iframes (about ×2, school, shop) with a static preview image + dark overlay + navy "Show interactive map" button + note "Loads Google Maps · may set cookies"
- JS swaps in the real iframe only on click → NO Google cookies until user chooses → no consent banner needed (the click IS the consent)
- Preview images map-school.jpg / map-shop.jpg (723×402, cropped from user screenshots, white border trimmed)
- CSS `.map-load` fills existing container (same size/position desktop + mobile via cover)
- Cookie Policy documents this: no first-party cookies, no analytics/marketing, Maps loads only on click. Privacy §11 rewritten to match (was generically claiming analytics/marketing cookies)

**SEO meta on 4 core pages (index, school, shop, about):**
- Unique keyword-rich meta description (windsurf/wingfoil/kitesurf + Costa Calma/Fuerteventura)
- Canonical + Open Graph (type/site_name/locale en_GB/title/description/url/image) + Twitter summary_large_image
- Domain confirmed: **https://shaka-fuerte.com** (non-www) — used in all canonical/og:url/og:image absolute URLs
- og-image.jpg (1200×630): 4-discipline collage (kite/wing/windsurf/lesson) with SHAKA logo centered, optimized 996 KB → 135 KB. NOTE: OG preview only renders once live on the real domain (absolute URL)

**Favicon (from logo-shaka-web.png, 2480×2480):**
- Full set: favicon.ico (16/32/48), favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (180, white bg for iOS), icon-192/512.png
- Linked in `<head>` of all 7 pages (favicon files go in site root)
- Note: circular logo text not legible at 16-32px (normal — colour blob is the recognisable cue)

### SESSION 2026-07-09 — Mobile 320px pass & legal reveal fix ✓✓

**320px / small-phone pass (CSS only, no HTML changes):**
- Added `img { max-width: 100% }` global safety net (prevents horizontal overflow). Deliberately did NOT add `overflow-x:hidden` on body (breaks sticky nav) — fixed root causes instead
- Fixed latent bug: index CTA hero ("Book Your / Equipment!") rendered at 72px on mobile (should be 56) due to two-class source-order conflict; with 8px letter-spacing "EQUIPMENT!" overflowed at 320px. Fixed via `.hero-title.hero-title-cta` specificity + reduced letter-spacing
- New `@media (max-width: 380px)` breakpoint: scales down largest display type (hero titles, sp-title, section/booking/howto/team/loc headings, freedom), tightens section padding 24→18px, collapses howto-grid 2-col → 1-col
- Verified: 768px mobile padding already uniform at 24px (no change needed); desktop 56px paddings are intentional (reviews section inset)

**Legal reveal bug fixed:**
- privacy/terms text was INVISIBLE at 320px (cookie worked). Cause: `.reveal` fade-in needs IntersectionObserver to see 12% of the element, but the huge `.legal` block on long pages (15-16 sections) is taller than ~8× viewport → 12% never on screen → observer never fires → text stuck at opacity:0. Cookie (8 sections) short enough to fire
- Fix: removed `reveal` class from `<main class="legal">` on all 3 legal pages → text always visible regardless of length/width (a legal doc doesn't need the animation)

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
- Maps cookie strategy (2026-06-26): "Approach B" click-to-load chosen over keeping live embeds (would need a banner) or removing maps (loses interactivity). Static preview + click = consent at the moment it's needed → no banner, keeps interactive map, GDPR-defensible.
- Domain (2026-06-26): confirmed **shaka-fuerte.com non-www**. Email is info@shaka-fuerte.com WITH hyphen (user briefly wrote it without — confirmed the hyphen version is correct).
- OG image (2026-06-26): 4-discipline collage + centered logo chosen over single-photo or photo+corner-logo. Logo centered = brand readable even if reshared/screenshotted, and sits in the "safe zone" (edges get cropped by some platforms).
- Reveal animation (2026-07-09): removed from long legal pages rather than lowering the observer threshold — a legal document doesn't need scroll animation, and always-visible text is the safe default.

### Migration / launch decisions (2026-07)
- Hosting: **site → Netlify, email stays on SiteGround** (Netlify has NO email hosting). "Move everything to Netlify" literally impossible for mail.
- Sequence: Scenario 1 first (launch site on Netlify, leave mail on SiteGround, zero email risk) → later Scenario 2 (migrate email to Zoho/Google, then drop SiteGround). Keeping SiteGround only for email long-term is wasteful (~18-30€/mo vs ~0-6€).
- Deploy method: **GitHub → Netlify continuous deployment** (user already uses VS Code → GitHub). Build command empty (static site), publish directory = folder with the .html files.
- DNS: keep it simple — repoint web records (A → 75.2.60.5, www CNAME) and **leave MX/SPF/DKIM untouched** so mail keeps working. Apex must use A record, never CNAME (CNAME on apex kills MX).
- Netlify plan: free tier is enough to launch; €9 Personal only if bandwidth cap (~15GB/mo, image-heavy site) gets close. Cloudflare Pages noted as unlimited-bandwidth alternative.
- CRITICAL pre-launch: secure the **domain under user's own account** (currently on a friend's SiteGround account he wants to close) — the domain is the top asset. Don't let friend close SiteGround until site AND mail are both migrated and verified.
- Languages: EN launches first; ES/IT/DE come AFTER launch (freeze stable EN, then translate — avoids doing rework ×4). Probably ES first (local market).

---

## TODO

### ⚑ STATUS SNAPSHOT (2026-07-09)
- Phase 1 (core EN pages): ✅ complete (+ 3 legal pages, not originally scoped)
- Phase 2 (refinement/consistency): ✅ ~done — chrome consistent, mobile 320px pass done, reveal bug fixed. Only WebP wiring + 2 optional items remain
- Phase 3 (forms/legal): 🟠 legal ✅ done; **Web3Forms live key ❌ = #1 blocker**
- Phase 4 (multilanguage): ⬜ not started — deliberately after launch
- Phase 5 (go-live): ⬜ not started
- Phase 6 (post-launch incl. email migration): ⬜ not started

### ⚑ MINIMUM TO GO LIVE (EN) — critical path
1. **Secure the domain** under user's own account (friend closing SiteGround) ← do first
2. **Web3Forms real key** in all 4 forms (with the boss) — forms don't send until then
3. **Align files into GitHub repo + push** (today's updated pages, css, images, favicon, og-image, legal)
4. **GitHub → Netlify**, test on .netlify.app
5. **Point DNS** (A + www CNAME) leaving MX on SiteGround → live on shaka-fuerte.com
Everything else (email migration, WebP, team photos, languages) = after launch.

### Still pending — content/polish (non-blocking)
- [ ] **Team photos: Giorgio + Mitch** (Matteo + Henri done) — last content gap
- [ ] **Wire WebP** via `<picture>` (perf; do before multilanguage)
- [ ] Verify shop gear sizes & brands
- [ ] Optional: OG/Twitter meta on 3 legal pages; "thank you" page after form submit


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
- [x] Uniform padding across all pages — verified (mobile already uniform at 24px; desktop 56px insets intentional)
- [x] Mobile fine-tuning at 320px — done (added `img` overflow guard + `@media (max-width:380px)` type scaling; fixed CTA hero letter-spacing overflow)
- [x] Legal pages reveal bug — fixed (privacy/terms text was invisible at 320px; removed reveal from long `.legal` block)
- [ ] Optional: optimize style.css (remove .page-* prefix from rules unique to one page — cosmetic, low priority)
- [ ] Optional: give about hero the same staggered text entrance as school/shop (currently static)
- [ ] Optional: add OG/Twitter meta to the 3 legal pages too (currently only meta description)

### Performance
- [x] Compress shop-windsurf.jpg (12 MB → 91 KB) — done
- [x] Optimize all images for web (JPEG + WebP twin generated for each) — done
- [ ] **Wire WebP via `<picture>`** — biggest remaining perf win. WebP files exist but pages still serve JPG. Applies cleanly only to `<img>` tags (gallery, cards, team, maps); hero/section CSS `background-image` are a separate case (image-set() or leave as JPG). Do BEFORE multilanguage to avoid ×4 rework
- [ ] Add loading="lazy" + width/height attrs on below-fold `<img>` (reduces CLS)

### Phase 3 — booking/contact
- [ ] **Get real Web3Forms access key** (with the boss, from the company mailbox) → replace `YOUR_ACCESS_KEY` in ALL 4 forms (index, school, shop, about). Forms already have custom subject + honeypot anti-spam built in. #1 blocker before launch — forms currently don't send
- [x] Create Privacy Policy page — done (+ Terms + Cookie Policy)
- [ ] Optional: "Thank you" redirect page after form submit
- [ ] Evaluate FareHarbor integration for live booking (not urgent)

### Phase 4 — multilanguage
- [ ] DECIDED: separate static folders /es/ /it/ /de/ (not Astro — site updated rarely)
- [ ] Do this only when English is final & frozen (translate once on stable content)
- [ ] Duplicate pages into language folders + translate
- [ ] Language switcher links to same page in each folder
- [ ] hreflang tags
- [ ] Consider shared prices.json so price changes don't desync across languages

### Phase 5 — go-live (Netlify)
- [ ] **SECURE THE DOMAIN under user's own account FIRST** (currently on friend's SiteGround account he wants to close) — top priority, before anything else
- [ ] Align today's output files into the GitHub repo (updated pages, css, images, favicon, og-image, legal pages) + push
- [ ] Connect GitHub → Netlify (build command empty, publish dir = folder with .html) → test on `.netlify.app` URL
- [ ] `_redirects` file (old WordPress URLs → new pages) — need the list of old URLs
- [ ] robots.txt + sitemap.xml in repo root
- [ ] Point DNS: apex A → 75.2.60.5, www CNAME → site.netlify.app; **leave MX/SPF/DKIM on SiteGround untouched** (mail keeps working)
- [ ] Verify: site loads on HTTPS, old URLs 301, test email send/receive on info@shaka-fuerte.com, OG preview, favicon
- [ ] schema.org LocalBusiness structured data
- [ ] Ask friend for a deadline to keep the mailbox alive; do NOT let him close SiteGround until site AND mail verified

### Phase 6 — post-launch
- [ ] Email migration: move info@shaka-fuerte.com to Zoho/Google, update MX → then friend can close SiteGround
- [ ] Google Search Console: add site, submit sitemap, check indexing
- [ ] Refine redirects to specific anchors when content justifies
- [ ] Monitor SEO ranking
- [ ] Optional: professional photo/video direction
