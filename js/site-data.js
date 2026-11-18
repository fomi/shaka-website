/* ============================================================
   SHAKA — UNICA FONTE DEI DATI CHE CAMBIANO  (multilingua)
   ------------------------------------------------------------
   ORARI e PROMO ora si gestiscono dalla pagina protetta
   /admin/settings (nessun deploy necessario): i valori qui
   sotto sono solo i VALORI DI RIPIEGO se l'API non risponde.
   PREZZI e note: si modificano ancora qui (oggetti PRICES /
   PRICE_NOTES), una volta sola per tutte le lingue.
   La lingua viene letta da <html lang="..">, quindi lo stesso
   file funziona in /  /es/  /it/  /de/  (condividi questo file).
   ============================================================ */
(function () {

  var LANG = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  if (['en', 'es', 'it', 'de'].indexOf(LANG) === -1) LANG = 'en';

  /* ---------- ORARI di ripiego: solo numeri/orari ---------- */
  var T = {
    shop:   "9:00 – 15:00<br>19:00 – 20:30",
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

  /* ---------- FRASE "chiuso il/i <giorno/i>" per lingua (indici 0=domenica ... 6=sabato) ----------
     pre + nomi dei giorni uniti da join + post; cap = iniziale maiuscola (tedesco). */
  var CLOSED = {
    en: { pre: "Closed on ", days: ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"], join: " and ", post: "", cap: false },
    es: { pre: "Cerrado ", days: ["los domingos", "los lunes", "los martes", "los miércoles", "los jueves", "los viernes", "los sábados"], join: " y ", post: "", cap: false },
    it: { pre: "Chiuso ", days: ["la domenica", "il lunedì", "il martedì", "il mercoledì", "il giovedì", "il venerdì", "il sabato"], join: " e ", post: "", cap: false },
    de: { pre: "", days: ["sonntags", "montags", "dienstags", "mittwochs", "donnerstags", "freitags", "samstags"], join: " und ", post: " geschlossen", cap: true }
  };
  // ordine di visualizzazione: lunedì -> domenica
  var WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

  /* ---------- ETICHETTE "chiuso per ferie" per lingua ---------- */
  var HOL = {
    en: { short: "Closed for holidays", reopen: "reopening " },
    es: { short: "Cerrado por vacaciones", reopen: "reapertura el " },
    it: { short: "Chiuso per ferie", reopen: "riapertura il " },
    de: { short: "Betriebsferien", reopen: "wieder geöffnet am " }
  };

  /* ---------- ORARI composti (riempiti da compose(), vedi motore) ---------- */
  var HOURS = {};

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

  /* ---------- BARRA PROMO (di ripiego) ---------- */
  var PROMO = { active: false, link: "school.html#book", until: "" };
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
  D.prices = PRICES;
  window.SITE_DATA = D;

  // "09:00" -> "9:00" (toglie lo zero iniziale, come nel sito attuale)
  function hm(t) { return String(t == null ? '' : t).replace(/^0(\d:)/, '$1'); }
  // "2026-08-31" -> "31/08"; altri formati restano invariati
  function fmtUntil(v) { v = String(v == null ? '' : v); var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v); return m ? (m[3] + "/" + m[2]) : v; }

  // Frase "chiuso il/i <giorno/i>" dai giorni selezionati (null se nessuno).
  function closedPhrase(days) {
    if (!days || !days.length) return null;
    var def = CLOSED[LANG], parts = [];
    for (var i = 0; i < WEEK_ORDER.length; i++) { var d = WEEK_ORDER[i]; if (days.indexOf(d) >= 0) parts.push(def.days[d]); }
    if (!parts.length) return null;
    var s = def.pre + parts.join(def.join) + def.post;
    if (def.cap) s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  }
  // Data di oggi (fuso Canarie) come "YYYY-MM-DD".
  function todayCanary() { try { return new Date().toLocaleDateString('en-CA', { timeZone: 'Atlantic/Canary' }); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  // Chiusura ferie attiva oggi per la sede ('school'/'shop'); fra più attive, quella che finisce più tardi.
  function activeClosure(list, loc, today) {
    var best = null;
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (c && c[loc] && c.from && c.to && c.from <= today && today <= c.to) { if (!best || c.to > best.to) best = c; }
    }
    return best;
  }
  // Data di riapertura = giorno dopo la fine, come "DD/MM".
  function reopenDM(toIso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(toIso || ''); if (!m) return '';
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])); d.setUTCDate(d.getUTCDate() + 1);
    return ('0' + d.getUTCDate()).slice(-2) + '/' + ('0' + (d.getUTCMonth() + 1)).slice(-2);
  }

  // Compone T / HOURS / PROMO / pt dai settaggi (null = valori di ripiego).
  function compose(s) {
    var dh = (s && s.hours) || {};
    var sc = dh.school || { open: '10:00', close: '17:00', closedDays: [] };
    var sh = dh.shop || { open1: '9:00', close1: '15:00', evening: true, open2: '19:00', close2: '20:30', closedDays: [2] };
    var hol = HOL[LANG];
    var today = todayCanary();
    var closures = (s && s.closures) || [];
    var scHol = activeClosure(closures, 'school', today);
    var shHol = activeClosure(closures, 'shop', today);

    // ---- SCUOLA ----
    if (scHol) {
      var r1 = reopenDM(scHol.to), reo1 = r1 ? (hol.reopen + r1) : '';
      HOURS.schoolLine = hol.short;
      HOURS.schoolFull = reo1 ? (hol.short + " · " + reo1) : hol.short;
      HOURS.schoolDays = reo1 ? (hol.short + "<br>" + reo1) : hol.short;
    } else {
      T.school = hm(sc.open) + " – " + hm(sc.close);
      var scPhrase = closedPhrase(sc.closedDays);
      HOURS.schoolLine = T.school;
      HOURS.schoolFull = T.school + " · " + (scPhrase || l.everyDayInline);
      HOURS.schoolDays = T.school + "<br>" + (scPhrase || l.everyDay);
    }

    // ---- NEGOZIO ----
    if (shHol) {
      var r2 = reopenDM(shHol.to), reo2 = r2 ? (hol.reopen + r2) : '';
      HOURS.shopHours = hol.short;
      HOURS.shopClosed = reo2;
      HOURS.shopBox = reo2 ? (hol.short + "<br>" + reo2) : hol.short;
    } else {
      T.shop = hm(sh.open1) + " – " + hm(sh.close1) + (sh.evening ? ("<br>" + hm(sh.open2) + " – " + hm(sh.close2)) : "");
      var shPhrase = closedPhrase(sh.closedDays) || l.everyDay;
      HOURS.shopHours = T.shop;
      HOURS.shopClosed = shPhrase;
      HOURS.shopBox = T.shop + "<br>" + shPhrase;
    }

    for (var k in HOURS) { if (HOURS.hasOwnProperty(k)) D[k] = HOURS[k]; }

    var pr = (s && s.promo) || {};
    PROMO.active = !!pr.active;
    PROMO.link   = pr.link || "school.html#book";
    PROMO.until  = fmtUntil(pr.until);
    if (pr.text && pr.text[LANG]) pt = pr.text[LANG];
  }

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

  // 1) render immediato con i valori di ripiego (nessun ritardo visibile)
  compose(null);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();

  // 2) poi sovrascrive con i settaggi live dal Worker (modifiche senza deploy)
  try {
    fetch('/api/settings', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (s) { if (!s) return; compose(s); run(); })
      .catch(function () { /* offline o errore: restano i valori di ripiego */ });
  } catch (e) { /* no-op */ }
})();
