/* Aghaaz-e-Asaas Kids — util.js
   Chhote helper functions. Sab kuch window.AA namespace mein. */
(function () {
  'use strict';
  const AA = (window.AA = { screens: {}, games: {}, data: {}, ui: {}, voice: {}, store: {} });

  AA.$ = (s, r) => (r || document).querySelector(s);
  AA.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  AA.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  AA.rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  AA.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  AA.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  AA.shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  // arr mein se n alag items, excl wale chhod kar
  AA.sample = (arr, n, excl) => AA.shuffle(arr.filter((x) => !(excl || []).includes(x))).slice(0, n);
  AA.wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const pad = (n) => String(n).padStart(2, '0');
  AA.dayStr = (d) => { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  AA.today = () => AA.dayStr(new Date());
  AA.addDays = (str, n) => { const [y, m, d] = str.split('-').map(Number); const dt = new Date(y, m - 1, d + n); return AA.dayStr(dt); };
  AA.daysBetween = (a, b) => { const p = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); }; return Math.round((p(b) - p(a)) / 86400000); };
  AA.weekDays = () => { const out = []; const t = AA.today(); for (let i = 6; i >= 0; i--) out.push(AA.addDays(t, -i)); return out; };

  AA.lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v === null ? fb : JSON.parse(v); } catch (e) { return fb; } };
  AA.lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  AA.lsDel = (k) => { try { localStorage.removeItem(k); } catch (e) {} };

  // Dobara-dobara na chalne wala debounce
  AA.debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  AA.reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  AA.vibrate = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} };
})();
