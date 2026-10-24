/* Luisa Foschi — script principale. Non serve modificarlo: le opere si gestiscono in opere.js */
(function () {
  'use strict';

  var CFG = window.LF_CONFIG || {};
  var OPERE = Array.isArray(window.OPERE) ? window.OPERE : [];
  var SHOW_N = CFG.opereVisibili || 8;
  var WA = CFG.whatsapp || '';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };

  /* ── UTILITÀ ── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function slugify(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function fmtPrezzo(p) {
    if (p === '' || p == null) return 'Su richiesta';
    if (typeof p === 'number') return '€ ' + p.toLocaleString('it-IT');
    return String(p);
  }
  function priceNum(o) { return typeof o.prezzo === 'number' ? o.prezzo : null; }
  function isSold(o) { return typeof o.prezzo === 'string' && /vendut/i.test(o.prezzo); }
  function isUnavailable(o) { return typeof o.prezzo === 'string' && /non\s*disponibil/i.test(o.prezzo); }
  function altText(o) {
    return o.titolo + (o.tecnica ? ', ' + o.tecnica.toLowerCase() : '') + (o.dimensioni ? ', ' + o.dimensioni : '') + ' — Luisa Foschi';
  }
  function waLink(text) { return 'https://wa.me/' + WA + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function scrollToEl(el) { el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
  var toastT;
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2600);
  }

  OPERE.forEach(function (o, i) {
    if (!o.id) o.id = slugify(o.titolo) || 'opera-' + (i + 1);
    if (!o.miniatura) o.miniatura = o.immagine;
    o._i = i;
  });

  /* ── DATA DELLE OPERE: ordine dalla più recente e etichetta "Nuova" automatica ── */
  var MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  var OGGI = new Date(), OGGI_M = OGGI.getFullYear() * 12 + OGGI.getMonth();
  var MESI_NOVITA = CFG.mesiNovita > 0 ? +CFG.mesiNovita : 6;
  function annoMese(o) { return { y: parseInt(o.anno, 10) || 0, m: Math.min(12, Math.max(0, parseInt(o.mese, 10) || 0)) }; }
  function dateKey(o) { var d = annoMese(o); return d.y * 100 + d.m; }
  // "Nuova" solo se anno e mese sono noti e l'opera è degli ultimi MESI_NOVITA mesi
  function isNew(o) {
    var d = annoMese(o); if (!d.y || !d.m) return false;
    var age = OGGI_M - (d.y * 12 + d.m - 1);
    return age >= -1 && age < MESI_NOVITA;
  }
  function dataLabel(o) { var d = annoMese(o); return d.m ? MESI[d.m - 1] + ' ' + d.y : (o.anno || ''); }
  OPERE.sort(function (a, b) { return dateKey(b) - dateKey(a) || a._i - b._i; });
  OPERE.forEach(function (o, i) { o._i = i; });
  // percorsi immagini: con webp:true esistono anche <nome>.webp, <nome>-sm.webp, <nome>-xs.webp
  function base(o) { return String(o.immagine || '').replace(/\.(jpe?g|png)$/i, ''); }
  function picture(o, sizes, attrs) {
    var img = '<img src="' + esc(o.miniatura) + '" ' + attrs + '>';
    if (!o.webp) return img;
    var b = esc(base(o));
    return '<picture><source type="image/webp" srcset="' + b + '-xs.webp 420w, ' + b + '-sm.webp 720w" sizes="' + sizes + '">' + img + '</picture>';
  }
  var WEBP = false;
  (function () { var t = new Image(); t.onload = function () { WEBP = t.width > 0; }; t.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'; })();
  function bigSrc(o) { return o.webp && WEBP ? base(o) + '.webp' : o.immagine; }
  function midSrc(o) { return o.webp && WEBP ? base(o) + '-sm.webp' : o.miniatura; }

  // colore medio del quadro come sfondo d'attesa, poi la foto compare con una dissolvenza
  function bg(o) { return /^#[0-9a-f]{6}$/i.test(o.colore || '') ? ';background:' + o.colore : ''; }
  function markLoaded(img) { if (img.complete && img.naturalWidth) img.classList.add('is-loaded'); }
  document.addEventListener('load', function (e) {
    var im = e.target;
    if (im.tagName === 'IMG' && im.closest('.tile-art, .work-pic')) im.classList.add('is-loaded');
  }, true);

  function byId(id) { for (var i = 0; i < OPERE.length; i++) if (OPERE[i].id === id) return OPERE[i]; return null; }

  /* ── GALLERIA ── */
  var works = $('works'), showAll = $('showAll');
  var order = 'recenti', list = OPERE.slice(), expanded = false;

  function sortedList() {
    var l = OPERE.slice();
    if (order === 'prezzo-asc' || order === 'prezzo-desc') {
      var dir = order === 'prezzo-asc' ? 1 : -1;
      l.sort(function (a, b) {
        var pa = priceNum(a), pb = priceNum(b);
        if (pa === null && pb === null) return a._i - b._i;
        if (pa === null) return 1;
        if (pb === null) return -1;
        return (pa - pb) * dir || a._i - b._i;
      });
    }
    return l;
  }

  // misure vere in cm (larghezza × altezza)
  function dimsOf(o) {
    var m = String(o.dimensioni || '').match(/(\d+(?:[.,]\d+)?)\s*[×xX]\s*(\d+(?:[.,]\d+)?)/);
    if (!m) return null;
    var w = parseFloat(m[1].replace(',', '.')), h = parseFloat(m[2].replace(',', '.'));
    return w > 0 && h > 0 ? { w: w, h: h } : null;
  }
  function ratioOf(o) {
    if (o.ar > 0) return +o.ar;
    var d = dimsOf(o);
    return d ? d.w / d.h : 0.8;
  }
  // misure da mostrare: quelle scritte (larghezza × altezza); senza misure, 50 cm di base con la forma della foto
  function sizeCm(o) {
    var d = dimsOf(o);
    return d || { w: 50, h: 50 / ratioOf(o) };
  }

  // Venduta / Non disponibile: lo dice l'etichetta sopra il titolo, il prezzo resta vuoto (se c'è già "Nuova", lo dice il prezzo)
  function cardHTML(o, fresh, it) {
    var meta = [o.anno, o.dimensioni, o.tecnica].filter(Boolean).join(' · ');
    return '<article class="work' + (fresh ? ' is-new' : '') + (it.pw < 170 ? ' is-small' : '') + (it.iw < 240 ? ' is-narrow' : '') + '">' +
      '<a class="work-link" href="#opera/' + esc(o.id) + '" data-id="' + esc(o.id) + '">' +
        '<div class="work-hang" style="width:' + it.fw + 'px"><div class="work-frame"><div class="work-pic" style="width:' + it.pw + 'px;height:' + it.ph + 'px' + bg(o) + '">' +
          picture(o, it.pw + 'px', 'alt="' + esc(altText(o)) + '" loading="lazy" decoding="async"') +
          '<span class="work-cta" aria-hidden="true">Scopri l’opera</span>' +
        '</div></div></div>' +
        '<div class="work-label">' +
          (isNew(o) ? '<span class="work-tag">Nuova</span>' : isSold(o) ? '<span class="work-tag sold">Venduta</span>' :
            isUnavailable(o) ? '<span class="work-tag sold">Non disponibile</span>' :
            it.tagRow ? '<span class="work-tag is-empty" aria-hidden="true">&nbsp;</span>' : '') +
          '<div class="work-row"><h3 class="work-title">' + esc(o.titolo) + '</h3>' +
          '<p class="work-price">' + (!isNew(o) && (isSold(o) || isUnavailable(o)) ? '' : esc(fmtPrezzo(o.prezzo))) + '</p></div>' +
          '<p class="work-meta">' + esc(meta) + '</p>' +
        '</div>' +
      '</a></article>';
  }

  // parete in scala: una sola scala (pixel per centimetro) per tutti i quadri e ogni lato arrotondato allo stesso modo,
  // così un lato di 70 cm è identico in ogni quadro; le cornici poggiano sulla stessa linea, i cartellini partono insieme
  var shown = 0, wallW = 0;
  function wallMetrics() {
    var cw = works.clientWidth || (window.innerWidth - 32), small = cw < 600;
    var vh = Math.max(560, Math.min(window.innerHeight || 900, 1300));
    // il quadro alto 100 cm occupa circa 6/10 dello schermo; il più largo (80 cm) sta sempre in una fila
    var cm = Math.min(cw / (small ? 118 : 112), vh * 0.6 / 100, 6.5);
    return {
      cw: cw,
      cm: cm,
      gap: Math.round(Math.max(18, Math.min(56, cw * 0.035))),
      // cornice con spessore fisso in centimetri, uguale per tutti: la misura la dà il quadro, non la cornice
      border: Math.round(Math.max(4, Math.min(11, cm * 1.8))),         // listello di legno (~1,8 cm)
      mat: Math.round(Math.max(1, Math.min(3, cm * 0.4))),             // filetto dorato interno (~0,4 cm)
      label: small ? 128 : 172                                         // spazio minimo per titolo e prezzo
    };
  }
  function px(cmv, M) { return Math.round(cmv * M.cm); }
  function renderGallery() {
    list = sortedList();
    var n = expanded ? list.length : Math.min(SHOW_N, list.length);
    var M = wallMetrics(), rows = [], row = [], used = 0;
    wallW = M.cw;
    for (var k = 0; k < n; k++) {
      var o = list[k], sz = sizeCm(o), pw = px(sz.w, M), ph = px(sz.h, M);
      var fw = pw + 2 * (M.border + M.mat);
      var it = { o: o, pw: pw, ph: ph, fw: fw, iw: Math.max(fw, M.label), fresh: k >= shown && shown > 0 };
      if (row.length && used + M.gap + it.iw > M.cw) { rows.push(row); row = []; used = 0; }
      used += (row.length ? M.gap : 0) + it.iw;
      row.push(it);
    }
    if (row.length) rows.push(row);
    // se nella riga c'è un'etichetta (Nuova/Venduta/Non disponibile) tengo il suo spazio anche negli altri: i titoli restano allineati
    rows.forEach(function (r) {
      var t = r.some(function (it) { return isNew(it.o) || isSold(it.o) || isUnavailable(it.o); });
      r.forEach(function (it) { it.tagRow = t; });
    });
    works.style.setProperty('--g', M.gap + 'px');
    works.style.setProperty('--fw', M.border + 'px');
    works.style.setProperty('--mat', M.mat + 'px');
    works.innerHTML = rows.map(function (r, i) {
      // file piene da un margine all'altro (allineate al titolo della sezione); l'ultima, se corta, parte da sinistra
      var ws = r.reduce(function (a, it) { return a + it.iw; }, 0);
      var full = r.length > 1 && (i < rows.length - 1 || ws + M.gap * (r.length - 1) > M.cw * 0.7);
      var gap = full ? Math.floor((M.cw - ws) / (r.length - 1) * 10) / 10 : M.gap;
      return '<div class="wall-row" style="column-gap:' + gap + 'px;grid-template-columns:' + r.map(function (it) { return it.iw.toFixed(1) + 'px'; }).join(' ') + '">' +
        r.map(function (it) { return cardHTML(it.o, it.fresh, it); }).join('') + '</div>';
    }).join('');
    works.querySelectorAll('img').forEach(markLoaded);
    shown = n;
    showAll.hidden = list.length <= SHOW_N;
    updateShowLabel();
  }
  function updateShowLabel() {
    showAll.textContent = expanded ? 'Mostra meno' : 'Vedi tutte le ' + list.length + ' opere';
    showAll.setAttribute('aria-expanded', String(expanded));
  }
  function setExpanded(v) {
    expanded = v;
    if (!v) shown = 0;
    renderGallery();
  }
  showAll.addEventListener('click', function () {
    setExpanded(!expanded);
    if (!expanded) scrollToEl($('opere'));
  });
  var wallT;
  window.addEventListener('resize', function () {
    clearTimeout(wallT);
    wallT = setTimeout(function () { if (Math.abs(works.clientWidth - wallW) > 1) renderGallery(); }, 120);
  });

  document.querySelectorAll('.sort-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      if (order === b.dataset.sort) return;
      order = b.dataset.sort;
      document.querySelectorAll('.sort-btn').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      shown = 0;
      renderGallery();
    });
  });

  works.addEventListener('click', function (e) {
    var a = e.target.closest('.work-link');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
    e.preventDefault();
    openDetail(a.dataset.id);
  });

  /* ── SCHEDA OPERA ── */
  var dlg = $('detail'), dWrap = $('dWrap'), dImg = $('dImg'), zoom = $('zoom');
  var cur = -1, pushed = false, afterClose = null, deepLinked = false;

  function hashId() {
    var m = location.hash.match(/^#opera\/([a-z0-9-]+)/i);
    return m ? m[1] : null;
  }
  function indexOf(id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return i;
    return -1;
  }

  function fill(o) {
    $('dTech').textContent = o.tecnica || '';
    $('dTitle').textContent = o.titolo;
    $('dYear').textContent = dataLabel(o) || '—';
    $('dSize').textContent = o.dimensioni || '—';
    $('dDesc').innerHTML = String(o.descrizione || '').split(/\n{2,}/).map(function (p) {
      return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>';
    }).join('');
    $('dPrice').textContent = fmtPrezzo(o.prezzo);
    $('dBarPrice').textContent = fmtPrezzo(o.prezzo);
    $('dCount').textContent = (cur + 1) + ' / ' + list.length;
    var info = [o.anno, o.dimensioni, typeof o.prezzo === 'number' ? fmtPrezzo(o.prezzo) : ''].filter(Boolean).join(' · ');
    $('dWa').href = waLink('Buongiorno Luisa, ho visto sul sito l’opera “' + o.titolo + '” (' + info + ') e vorrei ricevere maggiori informazioni.');

    // prima la miniatura (già in memoria), poi la foto grande
    dImg.alt = altText(o);
    dImg.src = midSrc(o);
    if (o.immagine !== o.miniatura) {
      var big = new Image(), want = bigSrc(o);
      big.onload = function () { if (list[cur] === o) dImg.src = want; };
      big.src = want;
    }
    [list[(cur + 1) % list.length], list[(cur - 1 + list.length) % list.length]].forEach(function (n) {
      if (n) { var im = new Image(); im.src = midSrc(n); }
    });
    dWrap.scrollTop = 0;
    var di = dlg.querySelector('.d-info'); if (di) di.scrollTop = 0;
  }

  function openDetail(id, opts) {
    opts = opts || {};
    var i = indexOf(id); if (i < 0) return;
    cur = i;
    fill(list[cur]);
    if (!dlg.open) {
      deepLinked = !!opts.fromHash;
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      root.classList.add('is-locked');
      $('dTitle').focus({ preventScroll: true });
      if (opts.fromHash) pushed = false;
      else { history.pushState({ lfOpera: id }, '', '#opera/' + id); pushed = true; }
    } else {
      history.replaceState(history.state, '', '#opera/' + id);
    }
  }

  function step(delta) {
    if (!list.length) return;
    cur = (cur + delta + list.length) % list.length;
    openDetail(list[cur].id);
  }

  function requestClose(cb) {
    afterClose = cb || null;
    if (pushed) { pushed = false; history.back(); }
    else {
      history.replaceState(null, '', location.pathname + location.search);
      hideDetail();
    }
  }

  function hideDetail() {
    closeZoom(true);
    if (dlg.open) { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); }
    root.classList.remove('is-locked');
    var o = list[cur];
    if (afterClose) { var c = afterClose; afterClose = null; setTimeout(c, 60); return; }
    if (!o) return;
    var link = works.querySelector('.work-link[data-id="' + o.id + '"]');
    if (!link && !expanded && deepLinked) { setExpanded(true); link = works.querySelector('.work-link[data-id="' + o.id + '"]'); }
    if (link) {
      if (deepLinked) link.scrollIntoView({ block: 'center' });
      link.focus({ preventScroll: !deepLinked });
    }
    deepLinked = false;
  }

  window.addEventListener('popstate', function () {
    var id = hashId();
    if (id && indexOf(id) >= 0) openDetail(id, { fromHash: true });
    else if (dlg.open) { pushed = false; hideDetail(); }
  });

  $('dClose').addEventListener('click', function () { requestClose(); });
  $('dPrev').addEventListener('click', function () { step(-1); });
  $('dNext').addEventListener('click', function () { step(1); });
  dlg.addEventListener('cancel', function (e) {
    e.preventDefault();
    if (!zoom.hidden) closeZoom(); else requestClose();
  });
  dlg.addEventListener('keydown', function (e) {
    if (!zoom.hidden) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });

  // swipe su smartphone
  var tx = 0, ty = 0;
  $('dStage').addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  $('dStage').addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ingrandimento
  function openZoom() {
    var o = list[cur]; if (!o) return;
    $('zoomImg').src = bigSrc(o); $('zoomImg').alt = altText(o);
    zoom.hidden = false;
    $('zoomClose').focus();
  }
  function closeZoom(silent) {
    if (zoom.hidden) return;
    zoom.hidden = true;
    if (!silent) $('dZoomBtn').focus();
  }
  $('dZoomBtn').addEventListener('click', openZoom);
  zoom.addEventListener('click', function () { closeZoom(); });

  // richiesta informazioni → modulo già compilato
  function requestInfo() {
    var o = list[cur];
    requestClose(function () {
      if (o) prefill(o);
      scrollToEl($('contatti'));
      setTimeout(function () { $('f-nome').focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
    });
  }
  $('dReq').addEventListener('click', requestInfo);
  $('dBarReq').addEventListener('click', requestInfo);

  // la barra in basso (smartphone) sparisce quando il riquadro prezzo è visibile
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      $('dBar').classList.toggle('is-hidden', en[0].isIntersecting);
    }, { root: dWrap, threshold: 0.2 }).observe($('dBuy'));
  }

  $('dShare').addEventListener('click', function () {
    var o = list[cur]; if (!o) return;
    var url = location.origin + location.pathname + '#opera/' + o.id;
    if (navigator.share) {
      navigator.share({ title: o.titolo + ' — Luisa Foschi', url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () { toast('Link dell’opera copiato'); }, function () { toast(url); });
    } else toast(url);
  });

  /* ── PRIMA SCHERMATA: PARETE DI OPERE CHE SCORRE ── */
  var wall = $('heroWall'), rows = [], rafId = 0, lastT = 0, pageScrollHold = 0;

  function tileHTML(o, copy, j) {
    var real = copy === 1;
    var eager = real && j < 5;
    return '<a class="tile" href="#opera/' + esc(o.id) + '" data-id="' + esc(o.id) + '" draggable="false"' +
      (real ? ' aria-label="' + esc(o.titolo + ', ' + [o.anno, o.dimensioni].filter(Boolean).join(', ') + ' — apri la scheda') + '"' : ' tabindex="-1" aria-hidden="true"') + '>' +
      '<span class="tile-art" style="--ar:' + ratioOf(o).toFixed(4) + bg(o) + '">' +
        picture(o, '(min-width:900px) 360px, 140px', 'alt="" draggable="false" decoding="async" loading="' + (eager ? 'eager' : 'lazy') + '"' + (real && j < 2 ? ' fetchpriority="high"' : '')) +
      '</span></a>';
  }

  function Row(el, items, dir) {
    var r = this;
    r.el = el; r.dir = dir; r.W = 0; r.pos = 0; r.speed = 20; r.hold = 0;
    r.hover = false; r.focus = false; r.drag = null; r.moved = false; r.lastSet = -1;
    // tre copie identiche: si scorre su quella centrale e si "riaggancia" senza salti
    el.innerHTML = '<div class="row-track">' + [0, 1, 2].map(function (k) {
      return '<div class="row-group"' + (k !== 1 ? ' aria-hidden="true"' : '') + '>' +
        items.map(function (o, j) { return tileHTML(o, k, j); }).join('') + '</div>';
    }).join('') + '</div>';

    el.addEventListener('scroll', function () {
      if (Math.abs(el.scrollLeft - r.lastSet) <= 1.5) return;   // scorrimento automatico
      r.pos = el.scrollLeft; r.hold = performance.now() + 2500;    // scorrimento dell'utente
      var before = r.pos; r.wrap();
      if (r.pos !== before) el.scrollLeft = r.pos;
      r.lastSet = el.scrollLeft;
    }, { passive: true });

    el.addEventListener('mouseenter', function () { r.hover = true; });
    el.addEventListener('mouseleave', function () { r.hover = false; });
    el.addEventListener('focusin', function () { r.focus = true; });
    el.addEventListener('focusout', function (e) { if (!el.contains(e.relatedTarget)) r.focus = false; });

    // trascinamento con il mouse
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      r.drag = { x: e.clientX, pos: r.pos }; r.moved = false;
    });
    window.addEventListener('pointermove', function (e) {
      if (!r.drag) return;
      var dx = e.clientX - r.drag.x;
      if (!r.moved && Math.abs(dx) > 5) { r.moved = true; el.classList.add('is-drag'); }
      if (!r.moved) return;
      var target = r.drag.pos - dx;
      r.pos = target; r.wrap(); r.drag.pos += r.pos - target;
      el.scrollLeft = r.pos; r.lastSet = el.scrollLeft;
    });
    window.addEventListener('pointerup', function () {
      if (!r.drag) return;
      r.drag = null; r.hold = performance.now() + 1800;
      setTimeout(function () { el.classList.remove('is-drag'); }, 0);
    });
    el.addEventListener('click', function (e) {
      if (r.moved) { e.preventDefault(); e.stopPropagation(); r.moved = false; return; }
      var t = e.target.closest('.tile');
      if (!t || e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
      e.preventDefault();
      openDetail(t.dataset.id);
    });
    el.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }
  Row.prototype.wrap = function () {
    if (this.pos < this.W * 0.5) this.pos += this.W;
    else if (this.pos > this.W * 1.5) this.pos -= this.W;
  };
  Row.prototype.apply = function () {
    this.wrap(); this.el.scrollLeft = this.pos; this.lastSet = this.el.scrollLeft;
  };
  Row.prototype.measure = function () {
    var g = this.el.querySelector('.row-group:nth-child(2)');
    var w = g ? g.getBoundingClientRect().width : 0;
    if (!w) return;
    // all'inizio il primo quadro parte intero, allineato al testo
    var inset = this.el.clientWidth * (window.innerWidth >= 900 ? 0.055 : 0.04) * (this.dir > 0 ? 1 : 3);
    this.pos = this.W ? w + (this.pos - this.W) * (w / this.W) : w - inset;
    this.W = w;
    var art = this.el.querySelector('.tile-art');
    this.speed = (art ? art.offsetHeight : 250) * 0.085 * (this.dir > 0 ? 1 : 0.85);
    this.apply();
  };

  function measureRows() { rows.forEach(function (r) { r.measure(); }); }
  var measureQueued = false;
  function queueMeasure() {
    if (measureQueued) return; measureQueued = true;
    requestAnimationFrame(function () { measureQueued = false; measureRows(); });
  }

  function tick(t) {
    var dt = Math.min(0.05, (t - (lastT || t)) / 1000); lastT = t;
    var run = !document.hidden && !dlg.open && t > pageScrollHold;
    rows.forEach(function (r) {
      if (run && r.W && !r.hover && !r.focus && !r.drag && t > r.hold) { r.pos += r.dir * r.speed * dt; r.apply(); }
    });
    rafId = requestAnimationFrame(tick);
  }
  function startDrift() { if (!rafId && !reduceMotion && rows.length) { lastT = 0; rafId = requestAnimationFrame(tick); } }
  function stopDrift() { if (rafId) cancelAnimationFrame(rafId); rafId = 0; }

  function buildWall() {
    if (!wall || !OPERE.length) return;
    var a = [], b = [];
    OPERE.forEach(function (o, i) { (i % 2 ? b : a).push(o); });   // le più recenti in testa a entrambe le file
    if (!b.length) b = a;
    rows = [new Row($('row1'), a, 1), new Row($('row2'), b, -1)];
    wall.querySelectorAll('img').forEach(markLoaded);

    // proporzioni vere appena l'immagine arriva (le tre copie restano identiche)
    wall.addEventListener('load', function (e) {
      var im = e.target;
      if (im.tagName !== 'IMG' || !im.naturalWidth) return;
      var tile = im.closest('.tile'); if (!tile || tile.dataset.ar) return;
      var ar = (im.naturalWidth / im.naturalHeight).toFixed(4);
      wall.querySelectorAll('.tile[data-id="' + tile.dataset.id + '"]').forEach(function (t) {
        t.dataset.ar = ar; t.querySelector('.tile-art').style.setProperty('--ar', ar);
      });
      queueMeasure();
    }, true);

    measureRows();
    window.addEventListener('resize', queueMeasure);
    // fuori schermo la parete si ferma: niente lavoro inutile per il telefono
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) startDrift(); else stopDrift();
      }).observe($('hero'));
    } else startDrift();
  }

  /* ── MODULO CONTATTI ── */
  var form = $('contactForm');
  var submitBtn = form.querySelector('.form-submit');
  var useWhatsApp = !CFG.formEndpoint && WA;
  if (useWhatsApp) {
    submitBtn.textContent = 'Invia su WhatsApp';
    $('formNote').textContent = 'Si aprirà WhatsApp con il messaggio già pronto da inviare.';
  }

  $('opereList').innerHTML = OPERE.map(function (o) { return '<option value="' + esc(o.titolo + ' (' + o.anno + ')') + '">'; }).join('');

  function toggleOpera() { $('f-opera-wrap').hidden = $('f-obj').value !== 'acquisto'; }
  $('f-obj').addEventListener('change', toggleOpera);

  function prefill(o) {
    $('f-obj').value = 'acquisto';
    toggleOpera();
    $('f-opera').value = o.titolo + ' (' + o.anno + ')';
    $('f-msg').value = 'Buongiorno Luisa, sono interessato/a all’opera “' + o.titolo + '” (' + o.anno + '). Potresti darmi maggiori informazioni?';
    clearErr($('f-msg'));
  }

  $('commBtn').addEventListener('click', function () {
    $('f-obj').value = 'commissione';
    toggleOpera();
  });

  var rules = [
    ['f-nome', 'e-nome', function (v) { return v.trim().length > 0; }],
    ['f-cog', 'e-cog', function (v) { return v.trim().length > 0; }],
    ['f-email', 'e-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }],
    ['f-msg', 'e-msg', function (v) { return v.trim().length > 0; }]
  ];
  function clearErr(el) {
    var fg = el.closest('.fg'); if (fg) fg.classList.remove('has-error');
    el.removeAttribute('aria-invalid');
  }
  rules.forEach(function (r) {
    var el = $(r[0]);
    el.setAttribute('aria-describedby', r[1]);
    el.addEventListener('input', function () { clearErr(el); });
  });
  function validate() {
    var firstBad = null;
    rules.forEach(function (r) {
      var el = $(r[0]), ok = r[2](el.value);
      el.closest('.fg').classList.toggle('has-error', !ok);
      if (ok) el.removeAttribute('aria-invalid'); else el.setAttribute('aria-invalid', 'true');
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function showDone(extraHTML) {
    form.hidden = true;
    $('formErr').hidden = true;
    var ok = $('formOk');
    if (extraHTML) ok.insertAdjacentHTML('beforeend', extraHTML);
    ok.hidden = false;
    ok.setAttribute('tabindex', '-1');
    ok.focus();
  }
  function showErr(msg) { var el = $('formErr'); el.textContent = msg; el.hidden = false; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var d = new FormData(form);
    var sel = $('f-obj');
    var richiesta = sel.value ? sel.options[sel.selectedIndex].text : '';

    if (CFG.formEndpoint) {
      submitBtn.disabled = true; submitBtn.textContent = 'Invio in corso…';
      fetch(CFG.formEndpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); showDone(); })
        .catch(function () {
          submitBtn.disabled = false; submitBtn.textContent = 'Invia il messaggio';
          showErr('Invio non riuscito. Riprova tra poco oppure chiamami al ' + (CFG.telefonoVisibile || '340 303 8995') + '.');
        });
      return;
    }
    if (useWhatsApp) {
      var lines = [
        'Buongiorno Luisa, sono ' + d.get('nome').trim() + ' ' + d.get('cognome').trim() + '.',
        richiesta ? 'Richiesta: ' + richiesta : '',
        d.get('opera') && !$('f-opera-wrap').hidden ? 'Opera: ' + d.get('opera') : '',
        '',
        d.get('messaggio').trim(),
        '',
        'Email: ' + d.get('email').trim() + (d.get('telefono') ? ' · Tel: ' + d.get('telefono').trim() : '')
      ].filter(function (l, i, a) { return l !== '' || (a[i - 1] && a[i - 1] !== ''); });
      var url = waLink(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
      showDone('<p class="form-note">WhatsApp non si è aperto? <a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">Tocca qui</a></p>');
    }
  });

  /* ── NAVIGAZIONE ── */
  var nav = $('nav'), ham = $('ham'), navLinks = $('navLinks'), btt = $('btt');
  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    nav.classList.toggle('menu-open', open);
    ham.setAttribute('aria-expanded', String(open));
    ham.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    root.classList.toggle('is-locked', open);
    if (open) { var f = navLinks.querySelector('a'); if (f) f.focus(); }
  }
  ham.addEventListener('click', function () { setMenu(!navLinks.classList.contains('is-open')); });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { if (navLinks.classList.contains('is-open')) setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) { setMenu(false); ham.focus(); }
  });

  var mnav = $('mnav'), heroEl = $('hero');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    btt.classList.toggle('on', y > 900);
    if (mnav) mnav.classList.toggle('on', y > heroEl.offsetHeight * 0.55);
    pageScrollHold = performance.now() + 180;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  // voce del menu attiva in base alla sezione visibile
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('#navLinks a[href^="#"], #mnav a[href^="#"], .nav-cta-desk').forEach(function (a) {
      var k = a.getAttribute('href').slice(1); (links[k] = links[k] || []).push(a);
    });
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].forEach(function (a) { a.classList.toggle('is-active', k === en.target.id); }); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (k) { var s = $(k); if (s) secObs.observe(s); });
  }

  /* ── COMPARSA AL PASSAGGIO ── */
  function observeReveal() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── AVVIO ── */
  $('statOpere').textContent = OPERE.length;
  $('heroCount').textContent = OPERE.length;
  $('statMostre').textContent = document.querySelectorAll('#expoList .expo-item').length;
  $('year').textContent = new Date().getFullYear();

  renderGallery();
  observeReveal();
  buildWall();

  var start = hashId();
  if (start && indexOf(start) >= 0) openDetail(start, { fromHash: true });
})();
