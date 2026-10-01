/* ============================================================
   SHAKA — UNICA FONTE DEI DATI CHE CAMBIANO  (multilingua)
   ------------------------------------------------------------
   COSA MODIFICARE:
   · Orari  → oggetto  T  (una volta sola, vale per tutte le lingue)
   · Prezzi → oggetto  PRICES  (solo numeri, una volta sola)
   · Testi tradotti (chiusure, note, promo) → oggetti  L / PRICE_NOTES / PROMO_TEXT
   La lingua viene letta da <html lang="..">, quindi lo stesso file
   funziona in /  /es/  /it/  /de/  (condividi questo unico file).
   ============================================================ */
(function () {

  var LANG = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  if (['en', 'es', 'it', 'de'].indexOf(LANG) === -1) LANG = 'en';

  /* ---------- ORARI: solo numeri/orari, UGUALI in tutte le lingue ---------- */
  var T = {
    shop:   "9:00 – 15:00<br>19:00 – 20:30",   // due fasce impilate
    school: "10:00 – 17:00"
  };

  /* ---------- ETICHETTE testuali per lingua ---------- */
  var L = {
    en: { closedTue: "Closed on Tuesdays", everyDay: "Open every day", everyDayInline: "every day", promoEnds: "· ends " },
    es: { closedTue: "Cerrado los martes", everyDay: "Abierto cada día", everyDayInline: "cada día", promoEnds: "· termina el " },
    it: { closedTue: "Chiuso il martedì", everyDay: "Aperto ogni giorno", everyDayInline: "ogni giorno", promoEnds: "· fino al " },
    de: { closedTue: "Dienstags geschlossen", everyDay: "Jeden Tag geöffnet", everyDayInline: "jeden Tag", promoEnds: "· endet am " }
  };
  var l = L[LANG];

  /* ---------- ORARI composti (numeri + etichetta lingua) ---------- */
  var HOURS = {
    shopHours:  T.shop,                                 // footer: due orari impilati
    shopClosed: l.closedTue,                            // footer: riga chiusura
    shopBox:    T.shop + "<br>" + l.closedTue,          // box info: tutto impilato
    schoolLine: T.school,                               // footer: solo orario
    schoolFull: T.school + " · " + l.everyDayInline,    // about: orario + giorni in riga
    schoolDays: T.school + "<br>" + l.everyDay          // box index: orario + giorni a capo
  };

  /* ---------- PREZZI: solo numeri (senza € — l'unità sta nella pagina), UGUALI ovunque ---------- */
  var PRICES = {
    school: {
      windsurf_lesson:  "75",   windsurf_course:  "190",  windsurf_private: "95",
      wing_lesson:  "95",       wing_course:  "250",       wing_private: "145",
      rental_windsurf: "30",    rental_wing: "45",         rental_sup: "20",
      rental_kayak1: "25",      rental_kayak2: "35"
    },
    shop: {
      windsurf_1d: "65",  windsurf_4d: "243", windsurf_6d: "325", windsurf_9d: "455", windsurf_12d: "535",
      kite_1d: "85",  kite_4d: "280", kite_6d: "375", kite_9d: "525", kite_12d: "620",
      wing_1d: "95",  wing_4d: "320", wing_6d: "445", wing_9d: "620", wing_12d: "735",
      surf_soft_1d: "18", surf_soft_4d: "65",  surf_soft_6d: "100", surf_soft_9d: "140", surf_soft_12d: "165",
      surf_hard_1d: "23", surf_hard_4d: "85",  surf_hard_6d: "120", surf_hard_9d: "165", surf_hard_12d: "195",
      bboard_1d: "8", bboard_4d: "30", bboard_6d: "40", bboard_9d: "53", bboard_12d: "70",
      skate_1d: "11", skate_4d: "35", skate_6d: "50",
      bike_mtb_1d: "25",  bike_mtb_extra: "22",
      bike_road_1d: "35", bike_road_extra: "33",
      bike_ebike_1d: "45", bike_ebike_extra: "42"
    }
  };

  /* ---------- NOTE prezzi (testo con € dentro) per lingua ---------- */
  var PRICE_NOTES = {
    en: {
      school: {
        rental_windsurf_note:  "2h 50€ · +10€ each extra hour",
        rental_windsurf_extra: "+10€ for wetsuit and harness",
        rental_wing_note:      "2h 75€ · +10€ each extra hour",
        rental_wing_extra:     "+10€ for wetsuit",
        rental_extra_hour:     "+10€ each extra hour"
      },
      shop: {
        windsurf_note: "* Extra carbon boom &amp; extension +10€/day · Board or sail only 40€/day, 195€/6 days",
        kite_note:     "* Board or kite only 40€/day, 195€/6 days",
        wing_note:     "* Board or wing only 40€/day, 195€/6 days"
      }
    },
    es: {
      school: {
        rental_windsurf_note:  "2h 50€ · +10€ cada hora extra",
        rental_windsurf_extra: "+10€ por neopreno y arnés",
        rental_wing_note:      "2h 75€ · +10€ cada hora extra",
        rental_wing_extra:     "+10€ por neopreno",
        rental_extra_hour:     "+10€ cada hora extra"
      },
      shop: {
        windsurf_note: "* Botavara de carbono y alargador extra +10€/día · Solo tabla o vela 40€/día, 195€/6 días",
        kite_note:     "* Solo tabla o cometa 40€/día, 195€/6 días",
        wing_note:     "* Solo tabla o wing 40€/día, 195€/6 días"
      }
    },
    it: {
      school: {
        rental_windsurf_note:  "2h 50€ · +10€ ogni ora extra",
        rental_windsurf_extra: "+10€ per muta e trapezio",
        rental_wing_note:      "2h 75€ · +10€ ogni ora extra",
        rental_wing_extra:     "+10€ per muta",
        rental_extra_hour:     "+10€ ogni ora extra"
      },
      shop: {
        windsurf_note: "* Boma in carbonio e prolunga extra +10€/giorno · Solo tavola o vela 40€/giorno, 195€/6 giorni",
        kite_note:     "* Solo tavola o kite 40€/giorno, 195€/6 giorni",
        wing_note:     "* Solo tavola o wing 40€/giorno, 195€/6 giorni"
      }
    },
    de: {
      school: {
        rental_windsurf_note:  "2h 50€ · +10€ je weitere Stunde",
        rental_windsurf_extra: "+10€ für Neopren und Trapez",
        rental_wing_note:      "2h 75€ · +10€ je weitere Stunde",
        rental_wing_extra:     "+10€ für Neopren",
        rental_extra_hour:     "+10€ je weitere Stunde"
      },
      shop: {
        windsurf_note: "* Extra Carbon Gabelbaum &amp; Verlängerung +10€/Tag · Nur Board oder Segel 40€/Tag, 195€/6 Tage",
        kite_note:     "* Nur Board oder Kite 40€/Tag, 195€/6 Tage",
        wing_note:     "* Nur Board oder Wing 40€/Tag, 195€/6 Tage"
      }
    }
  };
  // fondi le note tradotte nei prezzi
  var _n = PRICE_NOTES[LANG] || PRICE_NOTES.en;
  for (var sk in _n.school) { if (_n.school.hasOwnProperty(sk)) PRICES.school[sk] = _n.school[sk]; }
  for (var pk in _n.shop)   { if (_n.shop.hasOwnProperty(pk))   PRICES.shop[pk]   = _n.shop[pk]; }

  /* ---------- BARRA PROMO ----------
     active/link/until = controllo unico (uguale per tutte le lingue).
     Testo e CTA = tradotti per lingua in PROMO_TEXT. */
  var PROMO = {
    active: false,               // true = mostra la barra ovunque
    link:  "school.html#book",   // dove porta il clic
    until: ""                    // es. "31/08" per l'urgenza · "" = niente data
  };
  var PROMO_TEXT = {
    en: { text: "Summer Special: -15% on lessons & rental", cta: "Book now" },
    es: { text: "Oferta de verano: -15% en clases y alquiler", cta: "Reserva ya" },
    it: { text: "Offerta estate: -15% su lezioni e noleggio", cta: "Prenota ora" },
    de: { text: "Sommer Special: -15% auf Kurse & Verleih", cta: "Jetzt buchen" }
  };
  var pt = PROMO_TEXT[LANG] || PROMO_TEXT.en;

  /* ============================================================
     Da qui in giù è il motore: non serve toccarlo.
     ============================================================ */
  var D = {};
  for (var k in HOURS) { if (HOURS.hasOwnProperty(k)) D[k] = HOURS[k]; }
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
    var t = bar.querySelector('.promo-text');  if (t) t.textContent = pt.text || '';
    var c = bar.querySelector('.promo-cta');   if (c) c.textContent = pt.cta  || '';
    var u = bar.querySelector('.promo-until');
    if (u) {
      if (PROMO.until) { u.textContent = l.promoEnds + PROMO.until; u.style.display = ''; }
      else { u.textContent = ''; u.style.display = 'none'; }
    }
  }
  function run() { fill(); promoBar(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
