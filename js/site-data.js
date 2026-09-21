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
    }
    // shop: { ... }   <-- i prezzi del negozio li aggiungeremo qui
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
