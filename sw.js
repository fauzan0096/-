const CACHE_VERSION = 'qari-v2'; 
const CACHE_NAME = `aghaaz-e-asaas-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    './', 'index.html', 'manifest.json', 'qari-192.png', 'qari-512.png', 
    'qari-maskable-512.png', 'apple-touch-icon.png', 'app.html', 'app.css', 'app.js', 'courseData.js'
    // Jab aap apni MP3 files 'audio' folder mein daalein, toh unhe yahan list karein:
    // 'audio/alif.mp3', 'audio/baa.mp3', etc.
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                }
                return networkResponse;
            })
            .catch(() => caches.match(event.request))
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
