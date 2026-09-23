/* ============================================================
   SHAKA — invio form (Web3Forms) con messaggio di successo inline
   Vale per tutti i form del sito (.contact-form e .booking-form).
   Nessuna configurazione da toccare.
   ============================================================ */
(function () {
  var SUCCESS =
    '<div class="form-success">' +
      '<div class="form-success-icon">🤙</div>' +
      '<h3 class="form-success-title">Message Sent!</h3>' +
      '<p class="form-success-text">Thanks for reaching out &mdash; we’ll get back to you as soon as possible.</p>' +
    '</div>';

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!(form.classList && (form.classList.contains('contact-form') || form.classList.contains('booking-form')))) return;

    e.preventDefault();
    var btn = form.querySelector('.form-submit');
    var orig = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (res && res.success) {
        form.outerHTML = SUCCESS;
      } else {
        if (btn) { btn.disabled = false; btn.textContent = orig; }
        alert('Something went wrong. Please try again, or contact us on WhatsApp.');
      }
    })
    .catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = orig; }
      alert('Network error. Please try again, or contact us on WhatsApp.');
    });
  });
})();
