self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { clients.claim(); });
self.addEventListener('fetch', event => {
  // Simple network-first strategy for API requests; fall back to cache for static
});
