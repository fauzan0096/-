const CACHE_VERSION = 'qari-v4'; // Version update kiya hai
const CACHE_NAME = `aghaaz-e-asaas-${CACHE_VERSION}`;

// Saari files jo offline save honi chahiye
const ASSETS_TO_CACHE = [
    './', 
    'index.html', 
    'manifest.json', 
    'qari-192.png', 
    'qari-512.png', 
    'qari-maskable-512.png', 
    'apple-touch-icon.png', 
    'courseData.js', 
    'duas.js', 
    'waqiaat.js', 
    'games.js', // Nayi file add ki gayi
    'app.js',
    'app.css' // Agar aapke paas purani app.css mojood hai toh
];

// 1. INSTALL EVENT (Naya service worker install ho raha hai)
self.addEventListener('install', event => {
    self.skipWaiting(); // Naye SW ko foran active hone ka hukum dein
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching new assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. ACTIVATE EVENT (Purana service worker delete karna)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    // Agar koi purana cache hai jo current CACHE_NAME se match nahi karta, usay delete karo
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Naye SW ko foran control lene dein
    );
});

// 3. FETCH EVENT (Internet se latest lao, agar na mile toh cache se dikhao)
self.addEventListener('fetch', event => {
    // Sirf GET requests handle karein
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request) // Pehle internet se fetch karne ki koshish karein (Network First)
            .then(networkResponse => {
                // Agar internet chal raha hai aur response theek hai, toh cache update karein
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Agar internet nahi hai (Offline), toh cache se serve karein
                return caches.match(event.request);
            })
    );
});

// 4. MESSAGE EVENT (App se update ka message lena)
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
