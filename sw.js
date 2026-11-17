self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

const home = new URL(self.registration.scope);
const index = new URL('index.html', home);

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET' || request.mode !== 'navigate') return;
    const url = new URL(request.url);
    if (url.origin !== home.origin || (url.pathname !== home.pathname && url.pathname !== index.pathname)) return;

    // Keep network data, authentication and the live dashboard out of offline storage.
    event.respondWith(fetch(request).catch(() => new Response(
        '<!doctype html><html lang="en"><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<meta name="theme-color" content="#0f172a"><title>Murray’s Dashboard · Offline</title>' +
        '<style>body{background:#0f172a;color:#f8fafc;font:1rem system-ui;margin:2rem}' +
        'main{max-width:32rem;margin:auto}a{color:#7dd3fc}</style>' +
        '<main><h1>Murray’s Dashboard</h1><p>You’re offline. Reconnect to load your dashboard.</p>' +
        '<a href="' + home.pathname + '">Try again</a></main></html>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
    )));
});
