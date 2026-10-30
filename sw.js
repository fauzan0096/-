/* Aghaaz-e-Asaas Kids — sw.js : offline chalne ke liye */
const VER = 'aa-kids-v1';
const CORE = [
  './',
  'css/app.css',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'index.html',
  'js/album.js',
  'js/art.js',
  'js/audio.js',
  'js/boot.js',
  'js/data.js',
  'js/deen.js',
  'js/early.js',
  'js/games.js',
  'js/games2.js',
  'js/home.js',
  'js/learn.js',
  'js/lesson.js',
  'js/parent.js',
  'js/store.js',
  'js/trace.js',
  'js/ui.js',
  'js/util.js',
  'manifest.json'
];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VER).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('aa-kids-') && k !== VER).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.hostname === 'everyayah.com') {   // qari ki awaaz: pehle offline cache
    e.respondWith(caches.open('aa-audio-v1').then((c) => c.match(req).then((h) => h || fetch(req))));
    return;
  }
  const same = u.origin === location.origin;
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!same && !font) return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => {
    const net = fetch(req).then((r) => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(VER).then((c) => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
