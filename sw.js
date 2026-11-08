/* Aghaaz-e-Asaas Kids — sw.js
   Sab kuch offline: app, fonts aur Quran ki awaaz. Koi internet ki zaroorat nahi. */
const VER = 'aa-kids-v5';

const ICONS = ['icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];
const FONTS = ['fonts/fredoka-400.ttf', 'fonts/fredoka-600.ttf', 'fonts/fredoka-700.ttf', 'fonts/noto-naskh-500.ttf', 'fonts/noto-naskh-700.ttf', 'fonts/amiri-quran-400.ttf', 'fonts/amiri-400.ttf', 'fonts/amiri-700.ttf'];
const SCRIPTS = ['util.js', 'i18n.js', 'data.js', 'audio.js', 'store.js', 'ui.js', 'home.js', 'learn.js', 'trace.js', 'lesson.js', 'games.js', 'games2.js', 'early.js', 'art.js', 'deen.js', 'album.js', 'duo.js', 'parent.js', 'boot.js'];

// Surahein jo app mein hain: [surah number, ayat ki tadaad] — data.js se milna chahiye
const SURAH_AYAT = [[1, 7], [103, 3], [108, 3], [112, 4], [113, 5], [114, 6]];
const QURAN = (function () {
  const out = [];
  SURAH_AYAT.forEach(([s, n]) => {
    for (let a = 1; a <= n; a++) out.push('audio/quran/' + String(s).padStart(3, '0') + String(a).padStart(3, '0') + '.mp3');
  });
  return out;
})();

const CORE = ['./', 'index.html', 'app.css', 'manifest.json', 'audio/ustad-awaaz.json'].concat(ICONS, FONTS, SCRIPTS, QURAN);

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VER).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('aa-') && k !== VER).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// boot.js "Naya version tayyar hai" patti dikhata hai — tab hi naya worker lagta hai
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin) return;   // koi bahar ki cheez nahi

  // fonts aur qari ki awaaz kabhi nahi badalte — cache pehle
  if (/\/(fonts|audio)\//.test(u.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(VER);
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const r = await fetch(req);
        if (r && r.ok) c.put(req, r.clone());
        return r;
      } catch (err) { return new Response('', { status: 504, statusText: 'offline' }); }
    })());
    return;
  }

  // app files — naya pehle, warna cache se (offline bhi chalta rahe)
  e.respondWith(
    fetch(req).then((r) => {
      if (r && r.ok) { const cp = r.clone(); caches.open(VER).then((c) => c.put(req, cp)); }
      return r;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
