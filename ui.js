/* Aghaaz-e-Asaas Kids — ui.js
   Screen router, Noori (mascot), toast, jashn (celebration), parent gate, screen-time. */
(function () {
  'use strict';
  const AA = window.AA;
  const UI = AA.ui;
  const Store = AA.store;
  const D = AA.data;
  const $ = AA.$;

  /* ------------------------- icons ------------------------- */
  const ICONS = {
    back: '<path d="M15 5l-7 7 7 7" />',
    home: '<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"/>',
    mute: '<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2.5" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    play: '<path d="M8 5l11 7-11 7z" fill="currentColor"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" />',
    redo: '<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5"/>',
    undo: '<path d="M9 7L4 12l5 5M4 12h10a6 6 0 0 1 0 12"/>',
    erase: '<path d="M4 16l9-9a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3l-6 6H8z" fill="currentColor"/><path d="M12 20h8"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" fill="currentColor"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>'
  };
  UI.icon = (n, cls) => '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>';

  /* ------------------------- Noori (mascot) ------------------------- */
  UI.mascot = function (mood, cls) {
    mood = mood || 'happy';
    return '<svg class="noori ' + (cls || '') + '" data-mood="' + mood + '" viewBox="0 0 200 200" aria-hidden="true">' +
      '<ellipse cx="100" cy="190" rx="52" ry="7" fill="#2B2250" opacity=".12"/>' +
      '<g class="n-body">' +
        '<g class="n-arm-l"><circle cx="34" cy="138" r="13" fill="#FFB400"/></g>' +
        '<g class="n-arm-r"><circle cx="166" cy="138" r="13" fill="#FFB400"/></g>' +
        '<circle cx="100" cy="116" r="70" fill="#FFC83D"/>' +
        '<path d="M52 92a56 56 0 0 1 30-32" stroke="#FFE38A" stroke-width="9" stroke-linecap="round" fill="none"/>' +
        '<path d="M42 82Q100 4 158 82Z" fill="#2ED1A0"/>' +
        '<rect x="40" y="74" width="120" height="16" rx="8" fill="#12B5A6"/>' +
        '<path d="M100 36l4.2 9.2 10 1-7.5 6.7 2.2 9.8-8.9-5.2-8.9 5.2 2.2-9.8-7.5-6.7 10-1z" fill="#FFF4C2" transform="translate(0 6) scale(1)"/>' +
        '<circle cx="62" cy="138" r="11" fill="#FF8FA3" opacity=".65"/><circle cx="138" cy="138" r="11" fill="#FF8FA3" opacity=".65"/>' +
        '<g class="n-eyes"><ellipse cx="76" cy="116" rx="9" ry="12" fill="#2B2250"/><ellipse cx="124" cy="116" rx="9" ry="12" fill="#2B2250"/>' +
        '<circle cx="79" cy="111" r="3.6" fill="#fff"/><circle cx="127" cy="111" r="3.6" fill="#fff"/></g>' +
        '<path class="n-smile" d="M84 140Q100 156 116 140" stroke="#2B2250" stroke-width="5.5" stroke-linecap="round" fill="none"/>' +
        '<g class="n-open"><path d="M82 136Q100 172 118 136Z" fill="#7A2340"/><path d="M92 156Q100 150 108 156Q100 164 92 156Z" fill="#FF7A90"/></g>' +
      '</g></svg>';
  };

  /* ------------------------- helpers ------------------------- */
  UI.stage = () => $('#stage');
  UI.bind = function (root, handlers) {
    root.addEventListener('click', (e) => {
      const t = e.target.closest('[data-act]');
      if (!t || !root.contains(t) || t.disabled) return;
      const fn = handlers[t.dataset.act];
      if (fn) fn(t, e);
    });
  };
  UI.starsChip = () => '<span class="chip stars" data-stars><span class="chip-ic">⭐</span><b>' + (Store.p ? Store.p.stars : 0) + '</b></span>';
  Store.on('stars', () => {
    AA.$$('[data-stars] b').forEach((b) => { b.textContent = Store.p.stars; });
    AA.$$('[data-stars]').forEach((c) => { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); });
  });

  UI.topbar = function (o) {
    return '<header class="topbar">' +
      '<button class="icon-btn back" data-act="back" aria-label="Wapas">' + UI.icon('back') + '</button>' +
      '<div class="tb-title">' + (o.ur ? '<b class="ur">' + AA.esc(o.ur) + '</b>' : '') + '<small>' + AA.esc(o.ro || '') + '</small></div>' +
      '<div class="tb-right">' + (o.right || UI.starsChip()) + '</div></header>';
  };

  UI.toast = function (msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(UI.toast._t); UI.toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  };

  /* ------------------------- router ------------------------- */
  UI.stack = [];
  UI.cur = null;
  UI.go = function (name, params, opts) {
    opts = opts || {};
    const S = AA.screens[name];
    if (!S) { console.error('screen nahi mili', name); return; }
    leaveCurrent();
    if (opts.replace && UI.stack.length) UI.stack[UI.stack.length - 1] = { name, params };
    else if (opts.root) { UI.stack = [{ name, params }]; }
    else UI.stack.push({ name, params });
    if (!opts.replace) { try { history.pushState({ n: UI.stack.length }, ''); } catch (e) {} }
    mount(name, params);
  };
  UI._skipPop = 0;
  function doPop() {
    leaveCurrent();
    UI.stack.pop();
    const top = UI.stack[UI.stack.length - 1];
    mount(top.name, top.params);
  }
  UI.back = function () {
    if (closeTopModal()) return;
    if (UI.stack.length <= 1) return;
    doPop();
    UI._skipPop++;
    try { history.back(); } catch (e) { UI._skipPop = 0; }
    setTimeout(() => { UI._skipPop = 0; }, 600);
  };
  window.addEventListener('popstate', () => {
    if (UI._skipPop > 0) { UI._skipPop--; return; }
    if (closeTopModal()) { try { history.pushState({ n: UI.stack.length }, ''); } catch (e) {} return; }
    if (UI.stack.length > 1) doPop();
    else { try { history.pushState({ n: 1 }, ''); } catch (e) {} }
  });
  function leaveCurrent() {
    if (!UI.cur) return;
    const S = AA.screens[UI.cur.name];
    try { if (S && S.leave) S.leave(UI.cur.root); } catch (e) { console.error(e); }
    AA.voice.stop();
    UI.cur = null;
  }
  function mount(name, params) {
    const S = AA.screens[name];
    const stage = UI.stage();
    const root = document.createElement('section');
    root.className = 'screen s-' + name;
    root.innerHTML = S.render(params || {});
    stage.innerHTML = '';
    stage.appendChild(root);
    UI.cur = { name, params, root };
    UI.bind(root, { back: () => UI.back() });
    try { if (S.mount) S.mount(root, params || {}); } catch (e) { console.error(e); }
    root.scrollTop = 0; window.scrollTo(0, 0);
    document.body.dataset.screen = name;
  }
  UI.refresh = () => { if (UI.cur) { const { name, params } = UI.cur; leaveCurrent(); mount(name, params); } };

  /* ------------------------- modal ------------------------- */
  UI.modals = [];
  UI.modal = function (html, o) {
    o = o || {};
    const el = document.createElement('div');
    el.className = 'modal ' + (o.cls || '');
    el.innerHTML = '<div class="modal-card ' + (o.cardCls || '') + '">' + html + '</div>';
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('open'));
    const m = { el, onClose: o.onClose, dismiss: o.dismiss !== false };
    UI.modals.push(m);
    if (m.dismiss) el.addEventListener('click', (e) => { if (e.target === el) UI.closeModal(m); });
    return m;
  };
  UI.closeModal = function (m) {
    m = m || UI.modals[UI.modals.length - 1];
    if (!m) return;
    UI.modals = UI.modals.filter((x) => x !== m);
    m.el.classList.remove('open');
    setTimeout(() => m.el.remove(), 220);
    if (m.onClose) m.onClose();
  };
  function closeTopModal() {
    const m = UI.modals[UI.modals.length - 1];
    if (!m || !m.dismiss) return !!m;
    UI.closeModal(m); return true;
  }

  /* ------------------------- confetti ------------------------- */
  UI.confetti = function (host, n) {
    if (AA.reduceMotion()) return;
    host = host || document.body;
    const cols = ['#FF7A59', '#FFC83D', '#2ED1A0', '#3DA9FC', '#8B6CFF', '#FF6FA8'];
    const lay = document.createElement('div');
    lay.className = 'confetti';
    for (let i = 0; i < (n || 34); i++) {
      const p = document.createElement('i');
      p.style.left = AA.rand(2, 98) + '%';
      p.style.background = AA.pick(cols);
      p.style.setProperty('--dx', AA.rand(-80, 80) + 'px');
      p.style.setProperty('--rot', AA.rand(-540, 540) + 'deg');
      p.style.animationDelay = (Math.random() * 0.35).toFixed(2) + 's';
      p.style.animationDuration = (1.4 + Math.random() * 1.1).toFixed(2) + 's';
      p.style.borderRadius = Math.random() < 0.5 ? '50%' : '3px';
      lay.appendChild(p);
    }
    host.appendChild(lay);
    setTimeout(() => lay.remove(), 3000);
  };
  UI.floatText = function (host, text, x, y, cls) {
    const el = document.createElement('div');
    el.className = 'float-text ' + (cls || '');
    el.textContent = text;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    host.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  };

  /* ------------------------- jashn (celebration) ------------------------- */
  // o: { title, sub, big (emoji ya html), voice (spec), btn, btn2 }  -> Promise<'ok'|'two'>
  UI.celebrate = function (o) {
    return new Promise((resolve) => {
      let res = 'ok';
      const m = UI.modal(
        '<div class="cele">' + UI.mascot('cheer', 'cele-noori') +
        '<h2 class="cele-title">' + AA.esc(o.title || 'MashaAllah!') + '</h2>' +
        (o.big ? '<div class="cele-big">' + o.big + '</div>' : '') +
        (o.sub ? '<p class="cele-sub">' + AA.esc(o.sub) + '</p>' : '') +
        '<div class="cele-btns"><button class="btn big" data-m="ok">' + AA.esc(o.btn || 'Aage chalo') + ' ' + UI.icon('next') + '</button>' +
        (o.btn2 ? '<button class="btn ghost" data-m="two">' + AA.esc(o.btn2) + '</button>' : '') + '</div></div>',
        { cls: 'cele-modal', dismiss: false, onClose: () => resolve(res) });
      m.el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (!b) return; res = b.dataset.m; UI.closeModal(m); });
      UI.confetti(m.el, 40);
      AA.sfx.play(o.sfx || 'win');
      if (o.voice) AA.voice.seq(o.voice);
    });
  };
  UI.stickerModal = function (emoji) {
    return UI.celebrate({ title: 'Naya Sticker!', big: '<span class="sticker-pop">' + emoji + '</span>', sub: 'Sitare jama karke sticker mila', btn: 'Wah!', voice: [AA.data.T.nayaSticker], sfx: 'win' });
  };

  /* ------------------------- sitare dene ka ek hi raasta ------------------------- */
  // n sitare do, animation dikhao, naya sticker mila to jashn karo
  UI.reward = async function (n, why) {
    if (!n) return;
    const earned = Store.addStars(n, why);
    AA.sfx.play('star');
    UI.flyStars(n);
    for (const s of earned) { await AA.wait(500); await UI.stickerModal(s); }
  };
  UI.flyStars = function (n) {
    if (AA.reduceMotion()) return;
    const host = document.body;
    for (let i = 0; i < Math.min(n, 5); i++) {
      const s = document.createElement('div');
      s.className = 'fly-star'; s.textContent = '⭐';
      s.style.left = (45 + i * 4) + '%';
      s.style.animationDelay = i * 0.1 + 's';
      host.appendChild(s);
      setTimeout(() => s.remove(), 1500 + i * 100);
    }
  };
  // Aaj ke teen sitaron ka hisaab: kind = learn | play | deen
  UI.mission = async function (kind) {
    const bonus = Store.mission(kind);
    if (bonus) {
      await UI.reward(3, 'bonus');
      await UI.celebrate({ title: 'Aaj ke teeno sitare!', big: '🌟🌟🌟', sub: 'Seekha, khela aur deen ki baat bhi ki. +3 sitare', voice: [AA.pick(D.PRAISE)] });
    }
  };

  /* ------------------------- parent gate ------------------------- */
  UI.parentGate = function (why) {
    return new Promise((resolve) => {
      const a = AA.rand(23, 48), b = AA.rand(17, 39), ans = String(a + b);
      let typed = '', done = false;
      const m = UI.modal(
        '<div class="gate"><div class="gate-ic">' + UI.icon('lock') + '</div>' +
        '<h3>Sirf walidain ke liye</h3><p class="sub">' + AA.esc(why || 'Aage jaane ke liye hisaab hal karein') + '</p>' +
        '<div class="gate-q">' + a + ' + ' + b + ' = <b id="gate-a">?</b></div>' +
        '<div class="keypad">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, '✓'].map((k) => '<button class="key" data-k="' + k + '">' + k + '</button>').join('') + '</div>' +
        '<button class="btn ghost small" data-k="x">Wapas</button></div>',
        { cls: 'gate-modal', dismiss: false, onClose: () => { if (!done) resolve(false); } });
      const out = m.el.querySelector('#gate-a');
      m.el.addEventListener('click', (e) => {
        const k = e.target.closest('[data-k]'); if (!k) return;
        const v = k.dataset.k;
        if (v === 'x') { UI.closeModal(m); return; }
        if (v === '⌫') typed = typed.slice(0, -1);
        else if (v === '✓') {
          if (typed === ans) { done = true; resolve(true); UI.closeModal(m); return; }
          typed = ''; m.el.querySelector('.gate-q').classList.add('shake'); setTimeout(() => m.el.querySelector('.gate-q') && m.el.querySelector('.gate-q').classList.remove('shake'), 500);
        } else if (typed.length < 3) typed += v;
        out.textContent = typed || '?';
      });
    });
  };

  /* ------------------------- screen time ------------------------- */
  let lastInput = Date.now(), restShown = false, extraSec = 0;
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, () => { lastInput = Date.now(); }, { passive: true }));
  UI.startTimer = function () {
    if (UI._timer) return;
    UI._timer = setInterval(() => {
      if (document.hidden || !Store.p) return;
      if (Date.now() - lastInput > 45000) return;   // bachcha door hai — waqt na ginein
      const sec = Store.tick(5);
      const lim = Store.settings.limit;
      if (lim > 0 && !restShown && sec >= lim * 60 + extraSec) UI.restOverlay();
    }, 5000);
  };
  UI.restOverlay = function () {
    restShown = true;
    AA.voice.stop();
    const m = UI.modal(
      '<div class="rest">' + UI.mascot('happy', 'rest-noori') + '<h2>Aaram ka waqt 🌙</h2>' +
      '<p>Aaj ke liye bohat khel liya. Ab aankhon ko aaram do, kal phir milenge, in shaa Allah!</p>' +
      '<button class="btn ghost small" data-r="more">' + UI.icon('lock') + ' Walidain: thoda aur waqt</button></div>',
      { cls: 'rest-modal', dismiss: false });
    AA.voice.seq([D.T.aaramKaWaqt]);
    m.el.addEventListener('click', async (e) => {
      if (!e.target.closest('[data-r=more]')) return;
      if (await UI.parentGate('Bachche ko 10 minute aur dene ke liye')) { extraSec += 600; restShown = false; UI.closeModal(m); }
    });
  };
  UI.resetRest = () => { restShown = false; extraSec = 0; };

  /* ------------------------- sound toggle ------------------------- */
  UI.toggleSound = function () {
    Store.settings.sound = !Store.settings.sound;
    Store.saveSettings();
    if (!Store.settings.sound) AA.voice.stop();
    return Store.settings.sound;
  };

  /* ------------------------- choti utilities ------------------------- */
  // Arabic harf ko jis font mein dikhana hai uski class
  UI.ar = (t, cls) => '<span class="ar ' + (cls || '') + '" lang="ar" dir="rtl">' + AA.esc(t) + '</span>';
  // Phir se phir se dabane par animation dobara chalane ke liye
  UI.pulse = function (el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 800); };
})();
