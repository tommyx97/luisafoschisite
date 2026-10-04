/* Luisa Foschi — script principale. Non serve modificarlo: le opere si gestiscono in opere.js */
(function () {
  'use strict';

  var CFG = window.LF_CONFIG || {};
  var OPERE = Array.isArray(window.OPERE) ? window.OPERE : [];
  var SHOW_N = CFG.opereVisibili || 6;
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtPrezzo(p) {
    if (p === '' || p == null) return 'Su richiesta';
    if (typeof p === 'number') return '\u20ac\u202f' + p.toLocaleString('it-IT');
    return String(p);
  }

  /* ── GALLERIA ── */
  var grid = $('worksGrid');
  var showBtn = $('showBtn');
  var expanded = false;

  function renderGallery() {
    grid.innerHTML = OPERE.map(function (o, i) {
      var meta = [o.anno, o.dimensioni].filter(Boolean).join(' \u00b7 ');
      return '<article class="card' + (i >= SHOW_N ? ' hidden-w' : '') + '" data-i="' + i + '" tabindex="0" role="button" aria-label="Dettagli: ' + esc(o.titolo) + '">' +
        '<div class="card-img"><img src="' + esc(o.immagine) + '" alt="' + esc(o.titolo) + ' \u2014 Luisa Foschi" loading="' + (i < 4 ? 'eager' : 'lazy') + '" decoding="async">' +
        '<div class="card-ov"><span>Vedi opera</span></div></div>' +
        '<div class="card-info"><h3 class="card-title">' + esc(o.titolo) + '</h3>' +
        '<div class="card-bottom"><span class="card-meta">' + esc(meta) + (o.tecnica ? '<br>' + esc(o.tecnica) : '') + '</span>' +
        '<span class="card-price">' + esc(fmtPrezzo(o.prezzo)) + '</span></div>' +
        '<span class="card-btn">Dettagli</span></div></article>';
    }).join('');

    var stat = $('statOpere');
    if (stat) stat.textContent = OPERE.length;

    if (OPERE.length > SHOW_N) { showBtn.hidden = false; updateShowLabel(); }
  }
  function updateShowLabel() {
    showBtn.textContent = expanded ? 'Mostra meno \u2191' : 'Vedi tutte le ' + OPERE.length + ' opere \u2193';
    showBtn.setAttribute('aria-expanded', String(expanded));
  }
  showBtn.addEventListener('click', function () {
    expanded = !expanded;
    grid.querySelectorAll('.card.hidden-w').forEach(function (c) { c.classList.toggle('shown', expanded); });
    updateShowLabel();
    if (expanded) {
      var first = grid.querySelector('.card.hidden-w.shown');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: $('gallery').offsetTop - 70, behavior: 'smooth' });
    }
  });

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) openModal(+card.dataset.i);
  });
  grid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.card');
    if (card) { e.preventDefault(); openModal(+card.dataset.i); }
  });

  /* ── MODAL ── */
  var cur = null, lastFocus = null;
  function openModal(i) {
    var o = OPERE[i]; if (!o) return;
    cur = o; lastFocus = document.activeElement;
    var img = $('modalImg');
    img.src = o.immagine;
    img.alt = o.titolo + ' \u2014 Luisa Foschi';
    $('modalTech').textContent = o.tecnica || '';
    $('modalTitle').textContent = o.titolo;
    $('modalMeta').textContent = ['Anno ' + (o.anno || '\u2014'), o.dimensioni, 'Pezzo unico'].filter(Boolean).join(' \u00b7 ');
    $('modalDesc').textContent = o.descrizione || '';
    $('modalPrice').textContent = fmtPrezzo(o.prezzo);
    $('modalBg').classList.add('open');
    document.body.style.overflow = 'hidden';
    $('modalClose').focus();
  }
  function closeModal() {
    if (!$('modalBg').classList.contains('open')) return;
    $('modalBg').classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $('modalClose').addEventListener('click', closeModal);
  $('modalBg').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeMenu(); } });

  $('modalReqBtn').addEventListener('click', function () {
    if (cur) {
      $('f-obj').value = 'acquisto';
      $('f-opera-wrap').classList.remove('hidden');
      $('f-opera').value = cur.titolo + ' (' + cur.anno + ')';
      $('f-msg').value = 'Buongiorno Luisa, sono interessato/a all\u2019opera \u201c' + cur.titolo + '\u201d (' + cur.anno + '). Potresti darmi maggiori informazioni?';
    }
    closeModal();
    setTimeout(function () { $('contact').scrollIntoView({ behavior: 'smooth' }); }, 80);
  });

  /* ── FORM ── */
  var form = $('contactForm');
  var submitBtn = form.querySelector('.form-submit');
  var useWhatsApp = !CFG.formEndpoint && CFG.whatsapp;
  if (useWhatsApp) submitBtn.textContent = 'Invia su WhatsApp';

  $('f-obj').addEventListener('change', function () {
    $('f-opera-wrap').classList.toggle('hidden', this.value !== 'acquisto');
  });

  function showDone() { form.hidden = true; $('formErr').hidden = true; $('formOk').style.display = 'block'; }
  function showErr(msg) { var el = $('formErr'); el.textContent = msg; el.hidden = false; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var d = new FormData(form);
    var sel = $('f-obj');
    var richiesta = sel.value ? sel.options[sel.selectedIndex].text : '';

    if (CFG.formEndpoint) {
      submitBtn.disabled = true; submitBtn.textContent = 'Invio in corso\u2026';
      fetch(CFG.formEndpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); showDone(); })
        .catch(function () {
          submitBtn.disabled = false; submitBtn.textContent = 'Invia il Messaggio';
          showErr('Invio non riuscito. Riprova tra poco oppure contattami al 340 303 8995.');
        });
      return;
    }
    if (useWhatsApp) {
      var txt = [
        'Buongiorno Luisa, sono ' + d.get('nome') + ' ' + d.get('cognome') + '.',
        richiesta ? 'Richiesta: ' + richiesta : '',
        d.get('opera') ? 'Opera: ' + d.get('opera') : '',
        '', d.get('messaggio'), '',
        'Email: ' + d.get('email') + (d.get('telefono') ? ' \u00b7 Tel: ' + d.get('telefono') : '')
      ].filter(function (l, i, a) { return l !== '' || (a[i - 1] && a[i - 1] !== ''); }).join('\n');
      window.open('https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(txt), '_blank', 'noopener');
      showDone();
    }
  });

  /* ── NAV ── */
  var nav = $('nav'), ham = $('ham'), navLinks = $('navLinks'), btt = $('btt');
  function closeMenu() {
    navLinks.classList.remove('is-open');
    ham.classList.remove('is-open');
    ham.setAttribute('aria-expanded', 'false');
    if (!$('modalBg').classList.contains('open')) document.body.style.overflow = '';
  }
  ham.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    ham.classList.toggle('is-open', open);
    ham.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    btt.classList.toggle('on', window.scrollY > 500);
  }, { passive: true });
  btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ── REVEAL ── */
  function observeReveal() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  renderGallery();
  observeReveal();
})();
