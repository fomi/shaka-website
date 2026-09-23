/* ============================================================
   SHAKA — UNICA FONTE DEI DATI CHE CAMBIANO
   Modifica SOLO questo file per cambiare orari o prezzi.
   Si aggiorna in automatico su tutte le pagine (e su tutte
   le lingue, se condividi questo file tra le cartelle).
   ============================================================ */
(function () {

  /* ---------- ORARI ---------- */
  var HOURS = {
    shopHours:  "9:00 – 15:00<br>19:00 – 20:30",                 // footer: due orari impilati
    shopClosed: "Closed on Tuesdays",                            // footer: riga chiusura
    shopBox:    "9:00 – 15:00<br>19:00 – 20:30<br>Closed on Tuesdays", // box info: tutto impilato
    schoolLine: "10:00 – 17:00",                  // footer: solo orario
    schoolFull: "10:00 – 17:00 · every day",      // about: orario + giorni in riga
    schoolDays: "10:00 – 17:00<br>Open every day" // box index: orario + giorni a capo
  };

  /* ---------- PREZZI (solo il numero, senza € — l'unità sta nella pagina) ---------- */
  var PRICES = {
    school: {
      // ---- WINDSURF · lezioni ----
      windsurf_lesson:  "75",   // 1 lezione (2h)
      windsurf_course:  "190",  // corso completo (6h / 3 giorni)
      windsurf_private: "95",   // privata (all'ora)
      // ---- WINGFOIL · lezioni ----
      wing_lesson:  "95",   // 1 lezione (1.5h)
      wing_course:  "250",  // corso completo (4.5h / 3 giorni)
      wing_private: "145",  // privata (all'ora)
      // ---- NOLEGGIO in loco (prezzo per 1 ora) ----
      rental_windsurf: "30",  // windsurf 1h
      rental_wing:     "45",  // wingfoil 1h
      rental_sup:      "20",  // SUP 1h
      rental_kayak1:   "25",  // kayak singolo 1h
      rental_kayak2:   "35",  // kayak doppio 1h
      // ---- NOLEGGIO · note ed extra (testo con prezzi) ----
      rental_windsurf_note:  "2h 50€ · +10€ each extra hour",
      rental_windsurf_extra: "+10€ for wetsuit and harness",
      rental_wing_note:      "2h 75€ · +10€ each extra hour",
      rental_wing_extra:     "+10€ for wetsuit",
      rental_extra_hour:     "+10€ each extra hour"   // SUP e kayak
    },

    shop: {
      // ---- WINDSURF · set completo (per durata) ----
      windsurf_1d: "65",  windsurf_4d: "243", windsurf_6d: "325", windsurf_9d: "455", windsurf_12d: "535",
      windsurf_note: "* Extra carbon boom &amp; extension +10€/day · Board or sail only 40€/day, 195€/6 days",
      // ---- KITESURF ----
      kite_1d: "85",  kite_4d: "280", kite_6d: "375", kite_9d: "525", kite_12d: "620",
      kite_note: "* Board or kite only 40€/day, 195€/6 days",
      // ---- WINGFOIL ----
      wing_1d: "95",  wing_4d: "320", wing_6d: "445", wing_9d: "620", wing_12d: "735",
      wing_note: "* Board or wing only 40€/day, 195€/6 days",
      // ---- SURF · soft / hard ----
      surf_soft_1d: "18", surf_soft_4d: "65",  surf_soft_6d: "100", surf_soft_9d: "140", surf_soft_12d: "165",
      surf_hard_1d: "23", surf_hard_4d: "85",  surf_hard_6d: "120", surf_hard_9d: "165", surf_hard_12d: "195",
      // ---- BODYBOARD & SKIMBOARD ----
      bboard_1d: "8", bboard_4d: "30", bboard_6d: "40", bboard_9d: "53", bboard_12d: "70",
      // ---- SURF SKATE ----
      skate_1d: "11", skate_4d: "35", skate_6d: "50",
      // ---- BIKE · 1 day / extra day ----
      bike_mtb_1d: "25",  bike_mtb_extra: "22",
      bike_road_1d: "35", bike_road_extra: "33",
      bike_ebike_1d: "45", bike_ebike_extra: "42"
    }
  };

  /* ---------- BARRA PROMO (sotto il menu, su index/shop/school) ----------
     active: false = barra nascosta ovunque.  Per accenderla: active: true.
     Cambi testo, CTA, link e data qui — si aggiorna su tutte le pagine. */
  var PROMO = {
    active: true,                                       // true = mostra la barra
    text:  "Winter Special: -15% on lessons & rental",   // il messaggio (corto!)
    cta:   "Book now",                                   // testo call-to-action (la freccia si aggiunge da sola)
    link:  "school.html#book",                           // dove porta il clic
    until: ""                                            // es. "31 Aug" per l'urgenza · "" = niente data
  };

  /* ============================================================
     Da qui in giù è il motore: non serve toccarlo.
     ============================================================ */
  var D = {};
  // orari: chiavi usabili direttamente  (es. data-sd="shopBox")
  for (var k in HOURS) { if (HOURS.hasOwnProperty(k)) D[k] = HOURS[k]; }
  // prezzi: usabili come percorso        (es. data-sd="prices.school.windsurf_lesson")
  D.prices = PRICES;

  window.SITE_DATA = D;

  function get(path) {
    var parts = path.split('.'), v = D;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return null;
      v = v[parts[i]];
    }
    return v;
  }
  function fill() {
    var els = document.querySelectorAll('[data-sd]');
    for (var i = 0; i < els.length; i++) {
      var val = get(els[i].getAttribute('data-sd'));
      if (val != null) els[i].innerHTML = val;
    }
  }
  function promoBar() {
    var bar = document.getElementById('promoBar');
    if (!bar) return;
    if (!PROMO.active) { bar.style.display = 'none'; return; }
    bar.style.display = 'flex';
    if (PROMO.link) bar.setAttribute('href', PROMO.link);
    var t = bar.querySelector('.promo-text');  if (t) t.textContent = PROMO.text || '';
    var c = bar.querySelector('.promo-cta');   if (c) c.textContent = PROMO.cta  || '';
    var u = bar.querySelector('.promo-until');
    if (u) {
      if (PROMO.until) { u.textContent = '· ends ' + PROMO.until; u.style.display = ''; }
      else { u.textContent = ''; u.style.display = 'none'; }
    }
  }
  function run() { fill(); promoBar(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
