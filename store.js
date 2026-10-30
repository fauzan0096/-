/* Aghaaz-e-Asaas Kids — store.js
   Bachon ki progress, sitare, stickers, "yaad ka nizam" (spaced repetition), settings.
   Sab kuch sirf is phone mein (localStorage) — koi account, koi password, koi server nahi. */
(function () {
  'use strict';
  const AA = window.AA;
  const Store = AA.store;
  const D = AA.data;

  const K_PROFILES = 'aa:profiles', K_ACTIVE = 'aa:active', K_SET = 'aa:settings', K_P = 'aa:p:';
  // Dohrane ka waqfa (din): box 0..6
  const INTERVALS = [0, 1, 2, 4, 8, 16, 32];

  Store.settings = { sound: true, speed: 1, bilingual: false, limit: 0, theme: 'auto' };
  Store.profiles = [];
  Store.profile = null;
  Store.p = null;
  const listeners = {};
  Store.on = (ev, fn) => { (listeners[ev] = listeners[ev] || []).push(fn); };
  Store.off = (ev, fn) => { listeners[ev] = (listeners[ev] || []).filter((f) => f !== fn); };
  const emit = (ev, a) => (listeners[ev] || []).slice().forEach((f) => { try { f(a); } catch (e) { console.error(e); } });

  function blank() {
    return {
      v: 2, stars: 0, stickers: [], letters: {},
      harkat: { seen: [], found: 0 },
      games: {}, days: {}, habits: {}, surahs: {}, duas: {}, namaz: { wudu: 0, postures: 0, namazein: 0 },
      art: {}, early: {}, song: 0,
      missions: { date: '', learn: false, play: false, deen: false, bonus: false }
    };
  }

  /* ---------------- settings ---------------- */
  Store.loadSettings = function () {
    Object.assign(Store.settings, AA.lsGet(K_SET, {}));
    Store.applySettings();
  };
  Store.saveSettings = function () { AA.lsSet(K_SET, Store.settings); Store.applySettings(); };
  Store.applySettings = function () {
    const s = Store.settings;
    AA.voice.on = !!s.sound; AA.sfx.on = !!s.sound;
    AA.voice.speed = s.speed || 1;
    AA.voice.bilingual = !!s.bilingual;
    AA.voice.base = Store.profile && Store.profile.age === 'bada' ? 0.92 : 0.8;
    const night = s.theme === 'night' || (s.theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', night ? 'night' : 'light');
    const m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', night ? '#1B1740' : '#FFF4DC');
  };

  /* ---------------- profiles ---------------- */
  Store.init = function () {
    Store.profiles = AA.lsGet(K_PROFILES, []) || [];
    Store.loadSettings();
    const act = AA.lsGet(K_ACTIVE, null);
    const prof = Store.profiles.find((x) => x.id === act) || null;
    if (prof) Store.switchProfile(prof.id, true);
  };
  Store.addProfile = function (o) {
    const id = 'k' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    const prof = { id, name: (o.name || '').trim().slice(0, 14) || 'Nanha Dost', avatar: o.avatar || '🦁', age: o.age === 'bada' ? 'bada' : 'nanha', created: AA.today() };
    Store.profiles.push(prof);
    AA.lsSet(K_PROFILES, Store.profiles);
    AA.lsSet(K_P + id, blank());
    return id;
  };
  Store.switchProfile = function (id, silent) {
    const prof = Store.profiles.find((x) => x.id === id);
    if (!prof) return false;
    Store.profile = prof;
    const saved = AA.lsGet(K_P + id, null);
    Store.p = Object.assign(blank(), saved || {});
    // purane data mein naye khane na hon to bhar do
    ['harkat', 'games', 'days', 'habits', 'surahs', 'duas', 'art', 'early', 'letters', 'missions', 'namaz'].forEach((k) => { if (!Store.p[k]) Store.p[k] = blank()[k]; });
    AA.lsSet(K_ACTIVE, id);
    Store.applySettings();
    if (!silent) emit('profile', prof);
    return true;
  };
  Store.updateProfile = function (id, patch) {
    const prof = Store.profiles.find((x) => x.id === id); if (!prof) return;
    Object.assign(prof, patch);
    AA.lsSet(K_PROFILES, Store.profiles);
    if (Store.profile && Store.profile.id === id) Store.applySettings();
  };
  Store.deleteProfile = function (id) {
    Store.profiles = Store.profiles.filter((x) => x.id !== id);
    AA.lsSet(K_PROFILES, Store.profiles);
    AA.lsDel(K_P + id);
    if (Store.profile && Store.profile.id === id) { Store.profile = null; Store.p = null; AA.lsDel(K_ACTIVE); }
  };
  Store.resetProgress = function () { if (Store.profile) { Store.p = blank(); Store.save(); } };
  Store.exportProfile = () => JSON.stringify({ profile: Store.profile, progress: Store.p });

  let saveT = 0;
  Store.save = function () {
    if (!Store.profile || !Store.p) return;
    AA.lsSet(K_P + Store.profile.id, Store.p);
    emit('save');
  };
  Store.saveSoon = function () { clearTimeout(saveT); saveT = setTimeout(Store.save, 400); };
  window.addEventListener('pagehide', () => Store.save());
  document.addEventListener('visibilitychange', () => { if (document.hidden) Store.save(); });

  /* ---------------- harf aur yaad ka nizam ---------------- */
  Store.L = function (i) {
    const m = Store.p.letters;
    if (!m[i]) m[i] = { box: 0, due: '', seen: 0, done: false, right: 0, wrong: 0, lastUp: '', steps: {} };
    return m[i];
  };
  Store.isLearned = (i) => !!(Store.p.letters[i] && Store.p.letters[i].done);
  Store.learnedList = () => D.LETTERS.map((_, i) => i).filter((i) => Store.isLearned(i));
  Store.masteredList = () => Store.learnedList().filter((i) => Store.p.letters[i].box >= 3);
  Store.markSeen = function (i) { Store.L(i).seen++; Store.saveSoon(); };
  Store.finishLetter = function (i) {
    const L = Store.L(i);
    const first = !L.done;
    L.done = true;
    if (L.box < 1) L.box = 1;
    L.lastUp = AA.today();
    L.due = AA.addDays(AA.today(), INTERVALS[L.box]);
    Store.save();
    return first;
  };
  // ok = pehli koshish mein sahi? (din mein sirf pehla nateeja ginta hai)
  Store.srs = function (i, ok) {
    const L = Store.p.letters[i];
    if (!L || !L.done) return;           // seekhe hue harf hi
    const t = AA.today();
    if (ok) L.right++; else L.wrong++;
    if (L.lastUp !== t) {
      L.box = ok ? Math.min(6, Math.max(1, L.box + 1)) : Math.max(1, L.box - 1);
      L.lastUp = t;
    }
    L.due = AA.addDays(t, INTERVALS[L.box]);
    Store.saveSoon();
  };
  // Aaj dohrane layak harf (due pehle, phir kamzor)
  Store.dueList = function (limit) {
    const t = AA.today();
    const learned = Store.learnedList().map((i) => ({ i, L: Store.p.letters[i] }));
    const due = learned.filter((x) => x.L.due && x.L.due <= t).sort((a, b) => (a.L.due < b.L.due ? -1 : a.L.due > b.L.due ? 1 : a.L.box - b.L.box));
    return due.slice(0, limit || 99).map((x) => x.i);
  };
  Store.dueCount = () => Store.dueList().length;
  Store.weakList = function (n) {
    return Store.learnedList().map((i) => ({ i, L: Store.p.letters[i] }))
      .filter((x) => x.L.wrong > 0 && x.L.box <= 2)
      .sort((a, b) => b.L.wrong - a.L.wrong).slice(0, n || 5).map((x) => x.i);
  };
  // Tree ke liye: har harf ki halat  0=abhi nahi, 1=seekh raha, 2=yaad, 3=yaad par paani chahiye
  Store.letterState = function (i) {
    const L = Store.p.letters[i];
    if (!L || !L.done) return 0;
    const overdue = L.due && AA.daysBetween(L.due, AA.today()) >= 2;
    if (L.box >= 3) return overdue ? 3 : 2;
    return overdue ? 3 : 1;
  };
  // Games ke liye harf ka "pool": seekhe hue; kam hon to shuru ke kuch harf
  Store.pool = function (min) {
    min = min || 4;
    const learned = Store.learnedList();
    if (learned.length >= min) return learned;
    const out = learned.slice();
    for (let i = 0; out.length < min && i < 28; i++) if (!out.includes(i)) out.push(i);
    return out;
  };

  /* ---------------- sitare aur stickers ---------------- */
  Store.addStars = function (n, why) {
    if (!n || n < 0) return [];
    Store.p.stars += n;
    const earned = [];
    let k = Store.p.stickers.length;
    while (k < D.STICKERS.length && Store.p.stars >= D.stickerAt(k + 1)) {
      const unowned = D.STICKERS.filter((s) => !Store.p.stickers.includes(s));
      if (!unowned.length) break;
      const s = AA.pick(unowned);
      Store.p.stickers.push(s); earned.push(s); k++;
    }
    Store.save();
    emit('stars', { n, why, earned });
    return earned;
  };
  Store.nextStickerInfo = function () {
    const k = Store.p.stickers.length;
    if (k >= D.STICKERS.length) return { done: true, have: Store.p.stars, need: Store.p.stars, prev: Store.p.stars };
    const need = D.stickerAt(k + 1), prev = k === 0 ? 0 : D.stickerAt(k);
    return { done: false, have: Store.p.stars, need, prev };
  };

  /* ---------------- din ka hisaab ---------------- */
  Store.day = function (d) {
    d = d || AA.today();
    if (!Store.p.days[d]) Store.p.days[d] = { sec: 0, learn: 0, play: 0, deen: 0, letters: 0 };
    return Store.p.days[d];
  };
  Store.tick = function (sec) { const d = Store.day(); d.sec += sec; Store.saveSoon(); return d.sec; };
  Store.todayMinutes = () => Math.round(Store.day().sec / 60);

  // kind: 'learn' | 'play' | 'deen'. Aaj ke 3 sitaron ka hisaab.
  Store.mission = function (kind) {
    const m = Store.p.missions, t = AA.today();
    if (m.date !== t) { m.date = t; m.learn = m.play = m.deen = m.bonus = false; }
    Store.day()[kind]++;
    let bonus = false;
    if (!m[kind]) {
      m[kind] = true;
      if (m.learn && m.play && m.deen && !m.bonus) { m.bonus = true; bonus = true; }
    }
    Store.save();
    emit('mission', { kind, bonus });
    return bonus;
  };
  Store.missionToday = function () {
    const m = Store.p.missions;
    if (m.date !== AA.today()) return { learn: false, play: false, deen: false, bonus: false };
    return m;
  };
  Store.active = (d) => { const x = Store.p.days[d]; return !!(x && (x.learn || x.play || x.deen)); };
  Store.streak = function () {
    let t = AA.today(), n = 0;
    if (!Store.active(t)) t = AA.addDays(t, -1);
    while (Store.active(t)) { n++; t = AA.addDays(t, -1); }
    return n;
  };

  /* ---------------- games ka level ---------------- */
  Store.game = function (id) {
    if (!Store.p.games[id]) Store.p.games[id] = { lvl: 1, best: 0, played: 0 };
    return Store.p.games[id];
  };

  /* ---------------- achhi baatein ---------------- */
  Store.habitsToday = () => (Store.p.habits[AA.today()] || []);
  Store.toggleHabit = function (id) {
    const t = AA.today();
    const a = Store.p.habits[t] || (Store.p.habits[t] = []);
    const i = a.indexOf(id);
    if (i >= 0) { a.splice(i, 1); Store.save(); return false; }
    a.push(id); Store.save(); return true;
  };
})();
