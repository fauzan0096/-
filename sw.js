// sw.js
const C = 'qari-v4'; // Version change karein taake naya cache ban jaye
const F = [
    './', 
    'index.html', 
    'manifest.json', 
    'qari-192.png', 
    'qari-512.png', 
    'qari-maskable-512.png', 
    'apple-touch-icon.png', 
    'app.enc', 
    'users.json',
    'app.css',
    'app.js',
    'courseData.js',
    // Yahan apni audio files ke paths bhi add karein (agar mp3 use kar rahe hain)
    // 'audio/alif.mp3', 'audio/baa.mp3', etc.
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(C).then(c => c.addAll(F)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        fetch(e.request, { cache: 'no-store' }).then(r => {
            if (r.ok && e.request.url.startsWith(self.location.origin)) {
                const x = r.clone();
                caches.open(C).then(c => c.put(e.request, x));
            }
            return r;
        }).catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
});
