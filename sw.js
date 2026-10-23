// Service Worker — app ko offline chalane ke liye.
// Jab bhi koi file badlein, CACHE_VERSION ka number barha dein.
const CACHE_VERSION = 'v8';
const CACHE_NAME = `aghaaz-e-asaas-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    './',
    'index.html',
    'app.css',
    'manifest.json',
    'courseData.js',
    'duas.js',
    'waqiaat.js',
    'games.js',
    'surahs.js',
    'quran.js',
    'app.js',
    'qari-192.png',
    'qari-512.png',
    'qari-maskable-512.png',
    'apple-touch-icon.png'
];

// 1. INSTALL — har file alag cache hoti hai, taake ek file na mile to baaqi phir bhi save hon
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            Promise.all(ASSETS_TO_CACHE.map((url) => cache.add(url).catch(() => console.warn('Cache skip:', url))))
        )
    );
});

// 2. ACTIVATE — purane cache saaf
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// 3. FETCH
self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // Google Fonts: cache-first (ek baar load ho jaayein to offline bhi chalein)
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(
            caches.match(req).then((hit) => hit || fetch(req).then((res) => {
                const copy = res.clone();
                caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                return res;
            }).catch(() => hit))
        );
        return;
    }

    if (url.origin !== location.origin) return;

    // App files: pehle internet (taake hamesha latest mile), na ho to cache
    event.respondWith(
        fetch(req)
            .then((res) => {
                if (res && res.status === 200 && res.type === 'basic') {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                }
                return res;
            })
            .catch(() => caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
