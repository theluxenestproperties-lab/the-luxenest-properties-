/* Luxenest: Airbnb Furnishing & Staging portfolio. Reads window.LUXENEST_PORTFOLIO (projects.js). */
(function () {
  'use strict';
  var D = window.LUXENEST_PORTFOLIO;
  var grid = document.getElementById('afsGrid');
  var filtersEl = document.getElementById('afsFilters');
  if (!D || !grid || !filtersEl) return;

  var byId = {};
  D.projects.forEach(function (p) { byId[p.id] = p; });
  var catLabel = {};
  D.categories.forEach(function (c) { catLabel[c.id] = c.label; });
  var COMPLETE = 'complete';
  var COMPLETE_LABEL = 'Complete Airbnb Furnishing Projects';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function file(name, size) { return D.imageBase + name + '-' + size + '.webp'; }

  var ICON_EXPAND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  var ICON_ARROWS = '<svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L1.5 7 6 12M14 2l4.5 5L14 12"/></svg>';

  function image(name, alt, p, full, eager) {
    var i = document.createElement('img');
    i.alt = alt || '';
    i.width = p.width; i.height = p.height;
    i.decoding = 'async';
    i.draggable = false;
    if (!eager) i.loading = 'lazy';
    if (full) {
      i.src = file(name, 'full');
    } else {
      i.src = file(name, '800');
      i.srcset = file(name, '800') + ' 800w, ' + file(name, 'full') + ' ' + p.width + 'w';
      i.sizes = (p.width < p.height) ? '(max-width:900px) 90vw, 460px' : '(max-width:900px) 92vw, 570px';
    }
    return i;
  }

  /* ---------- Before / After slider ---------- */
  function bindSlider(box) {
    var handle = box.querySelector('.ba-handle');
    var dragging = false;
    function setPos(pct) {
      pct = Math.max(0, Math.min(100, pct));
      box.style.setProperty('--pos', pct + '%');
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromX(x) {
      var r = box.getBoundingClientRect();
      setPos(((x - r.left) / r.width) * 100);
    }
    box.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.ba-full')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      /* Touch: only the handle drags, so the page still scrolls normally */
      if (e.pointerType === 'touch') {
        var r = handle.getBoundingClientRect();
        if (Math.abs(e.clientX - (r.left + r.width / 2)) > 30) return;
      }
      dragging = true;
      box.classList.add('drag');
      try { box.setPointerCapture(e.pointerId); } catch (err) {}
      fromX(e.clientX);
      handle.focus({ preventScroll: true });
      if (e.pointerType !== 'touch') e.preventDefault();
    });
    box.addEventListener('pointermove', function (e) { if (dragging) fromX(e.clientX); });
    function end() { dragging = false; box.classList.remove('drag'); }
    box.addEventListener('pointerup', end);
    box.addEventListener('pointercancel', end);
    box.addEventListener('lostpointercapture', end);
    handle.addEventListener('keydown', function (e) {
      var cur = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
      var step = e.shiftKey ? 10 : 3;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setPos(cur - step); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setPos(cur + step); }
      else if (e.key === 'Home') { setPos(0); }
      else if (e.key === 'End') { setPos(100); }
      else return;
      e.preventDefault();
      e.stopPropagation();
    });
  }

  function media(p, opts) {
    opts = opts || {};
    var box = el('div', 'ba');
    box.style.setProperty('--ar', p.width + ' / ' + p.height);
    var eager = !!opts.eager;
    if (p.before) {
      box.appendChild(image(p.after, p.altAfter, p, opts.full, eager));
      var b = image(p.before, p.altBefore, p, opts.full, eager);
      b.className = 'ba-before';
      box.appendChild(b);
      var tl = el('span', 'ba-tag l', 'Before'); tl.setAttribute('aria-hidden', 'true');
      var tr = el('span', 'ba-tag r', 'After'); tr.setAttribute('aria-hidden', 'true');
      box.appendChild(tl); box.appendChild(tr);
      var h = el('div', 'ba-handle');
      h.tabIndex = 0;
      h.setAttribute('role', 'slider');
      h.setAttribute('aria-label', 'Before and after comparison for ' + p.title + '. Use the left and right arrow keys.');
      h.setAttribute('aria-orientation', 'horizontal');
      h.setAttribute('aria-valuemin', '0');
      h.setAttribute('aria-valuemax', '100');
      h.setAttribute('aria-valuenow', '50');
      var k = el('span', 'ba-knob'); k.innerHTML = ICON_ARROWS;
      h.appendChild(k);
      box.appendChild(h);
      bindSlider(box);
    } else {
      box.classList.add('single');
      box.appendChild(image(p.after, p.altAfter, p, opts.full, eager));
      var t = el('span', 'ba-tag r', 'After'); t.setAttribute('aria-hidden', 'true');
      box.appendChild(t);
    }
    return box;
  }

  /* ---------- Cards ---------- */
  var visible = [];  /* ids in the order currently shown (used by the full-screen view) */

  function card(p, idx) {
    var c = el('article', 'afs-card');
    if (p.width < p.height) c.classList.add('portrait');
    var m = media(p, { eager: idx < 2 });
    var fb = el('button', 'ba-full');
    fb.type = 'button';
    fb.setAttribute('aria-label', 'View ' + p.title + ' full screen');
    fb.innerHTML = ICON_EXPAND;
    fb.addEventListener('click', function () { openLightbox(p.id, fb); });
    m.appendChild(fb);
    c.appendChild(m);
    var meta = el('div', 'afs-meta');
    meta.appendChild(el('div', 'afs-cat', catLabel[p.category] || ''));
    meta.appendChild(el('h3', 'afs-title', p.title));
    meta.appendChild(el('p', 'afs-desc', p.description));
    c.appendChild(meta);
    return c;
  }

  /* ---------- Filters and rendering ---------- */
  var active = 'all';
  var groups = D.groups || [];

  function buildFilters() {
    filtersEl.innerHTML = '';
    var tabs = [{ id: 'all', label: 'All' }];
    D.categories.forEach(function (c) {
      var has = D.projects.some(function (p) { return p.category === c.id; });
      if (has) tabs.push(c);
    });
    if (groups.length) tabs.push({ id: COMPLETE, label: COMPLETE_LABEL });
    tabs.forEach(function (t) {
      var b = el('button', 'afs-filter', t.label);
      b.type = 'button';
      b.dataset.cat = t.id;
      b.setAttribute('aria-pressed', t.id === active ? 'true' : 'false');
      b.addEventListener('click', function () { setActive(t.id, true); });
      filtersEl.appendChild(b);
    });
  }

  function setActive(id, push) {
    active = id;
    Array.prototype.forEach.call(filtersEl.children, function (b) {
      b.setAttribute('aria-pressed', b.dataset.cat === id ? 'true' : 'false');
    });
    if (push && window.history && history.replaceState) {
      history.replaceState(null, '', id === 'all' ? location.pathname : '#' + id);
    }
    render();
  }

  function render() {
    grid.innerHTML = '';
    visible = [];
    if (active === COMPLETE) {
      grid.className = 'afs-groups';
      var n = 0;
      groups.forEach(function (g) {
        var sec = el('section', 'afs-group');
        var head = el('div', 'afs-ghead');
        head.appendChild(el('div', 'afs-cat', COMPLETE_LABEL));
        head.appendChild(el('h3', null, g.title));
        head.appendChild(el('p', null, g.description));
        sec.appendChild(head);
        var inner = el('div', 'afs-grid');
        g.projects.forEach(function (id) {
          var p = byId[id];
          if (!p) return;
          visible.push(id);
          inner.appendChild(card(p, n++));
        });
        sec.appendChild(inner);
        grid.appendChild(sec);
      });
      return;
    }
    grid.className = 'afs-grid';
    var list = D.projects.filter(function (p) { return active === 'all' || p.category === active; });
    list.forEach(function (p, i) {
      visible.push(p.id);
      grid.appendChild(card(p, i));
    });
    if (!list.length) grid.appendChild(el('p', 'afs-empty', 'New projects are on their way.'));
  }

  /* ---------- Full-screen view ---------- */
  var lb, lbMedia, lbCap, lbCount, lbPrev, lbNext, lbClose, lbIdx = 0, lastFocus = null;

  function buildLightbox() {
    lb = el('div', 'lb');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Project photographs, full screen');
    lbCount = el('div', 'lb-count');
    lbClose = el('button', 'lb-btn lb-close');
    lbClose.type = 'button'; lbClose.setAttribute('aria-label', 'Close full screen view');
    lbClose.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
    lbPrev = el('button', 'lb-btn lb-prev');
    lbPrev.type = 'button'; lbPrev.setAttribute('aria-label', 'Previous project');
    lbPrev.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
    lbNext = el('button', 'lb-btn lb-next');
    lbNext.type = 'button'; lbNext.setAttribute('aria-label', 'Next project');
    lbNext.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
    lbMedia = el('div', 'lb-holder');
    lbCap = el('div', 'lb-cap');
    [lbCount, lbClose, lbPrev, lbNext, lbMedia, lbCap].forEach(function (n) { lb.appendChild(n); });
    document.body.appendChild(lb);

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function () { step(-1); });
    lbNext.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key === 'ArrowLeft') { step(-1); return; }
      if (e.key === 'ArrowRight') { step(1); return; }
      if (e.key === 'Tab') {
        var f = lb.querySelectorAll('button:not([hidden]), [tabindex="0"]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function showLb() {
    var p = byId[visible[lbIdx]];
    if (!p) return;
    lbMedia.innerHTML = '';
    var m = media(p, { full: true, eager: true });
    m.classList.add('lb-media');
    m.style.setProperty('--lbr', (p.width / p.height).toFixed(4));
    lbMedia.appendChild(m);
    lbCap.innerHTML = '';
    lbCap.appendChild(el('div', 'afs-cat', catLabel[p.category] || ''));
    lbCap.appendChild(el('div', 'afs-title', p.title));
    lbCap.appendChild(el('p', null, p.description));
    lbCount.textContent = (lbIdx + 1) + ' / ' + visible.length;
    var multi = visible.length > 1;
    lbPrev.hidden = !multi; lbNext.hidden = !multi;
  }

  function step(d) {
    if (visible.length < 2) return;
    lbIdx = (lbIdx + d + visible.length) % visible.length;
    showLb();
  }

  function openLightbox(id, opener) {
    if (!lb) buildLightbox();
    lbIdx = Math.max(0, visible.indexOf(id));
    lastFocus = opener || document.activeElement;
    showLb();
    lb.classList.add('open');
    document.body.classList.add('lb-lock');
    lbClose.focus();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open');
    lbMedia.innerHTML = '';
    document.body.classList.remove('lb-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Start ---------- */
  var hash = (location.hash || '').replace('#', '');
  var valid = hash === COMPLETE ? groups.length > 0 : D.categories.some(function (c) { return c.id === hash && D.projects.some(function (p) { return p.category === c.id; }); });
  if (valid) active = hash;
  buildFilters();
  render();
})();
