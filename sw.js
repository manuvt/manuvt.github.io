// Service worker: keeps the site available offline after the first visit.
// Bump CACHE_VERSION whenever you change any file, so visitors get the update.
const CACHE_VERSION = 'site-v1';

const FILES = [
  './',
  'index.html',
  'admission_info.html',
  'ProfessoNasirMemon.jpeg',
  'fonts/playfair-display-latin-wght-normal.woff2',
  'fonts/playfair-display-latin-wght-italic.woff2',
  'fonts/inter-latin-wght-normal.woff2',
  'fonts/jetbrains-mono-latin-wght-normal.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (so online visitors always see the latest page), cache as fallback when offline.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) =>
          hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())
        )
      )
  );
});
