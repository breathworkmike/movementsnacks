// Movement Snacks — Service Worker
// Caches the app shell for offline use

const CACHE = 'movement-snacks-v1';
const ASSETS = [
  './daily-practice.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can; ignore failures for external resources
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => {}))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache first, fall back to network, update cache
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if(event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networked = fetch(event.request).then(response => {
        // Cache successful responses for the app itself
        if(response.ok && event.request.url.includes('daily-practice')){
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // if network fails, use cache

      // Return cached immediately if available, otherwise wait for network
      return cached || networked;
    })
  );
});

// Background sync placeholder for coach data
self.addEventListener('sync', event => {
  if(event.tag === 'coach-sync'){
    // Future: push coach updates when back online
  }
});
