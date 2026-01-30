importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

// Configure cache names
workbox.core.setCacheNameDetails({
	prefix: "saas-ui-svelte",
	suffix: "v1",
	precache: "precache",
	runtime: "runtime",
});

// Precache critical assets
const PRECACHE_ASSETS = ["/", "/docs/"];

self.addEventListener("install", (event) => {
	const cacheName = workbox.core.cacheNames.runtime;
	event.waitUntil(
		caches.open(cacheName).then((cache) => cache.addAll(PRECACHE_ASSETS))
	);
});

// Cache-First for static assets (JS, CSS, fonts, images, Astro build files)
workbox.routing.registerRoute(
	({ request, url }) =>
		request.destination === "script" ||
		request.destination === "style" ||
		request.destination === "image" ||
		request.destination === "font" ||
		url.pathname.includes("/_astro/"),
	new workbox.strategies.CacheFirst({
		cacheName: "assets-cache",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	})
);

// Network-First for HTML pages (fresh content, offline fallback)
workbox.routing.registerRoute(
	({ request }) => request.headers.get("accept")?.includes("text/html"),
	new workbox.strategies.NetworkFirst({
		cacheName: "pages-cache",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 50,
			}),
		],
	})
);

// Take control immediately
self.skipWaiting();
workbox.core.clientsClaim();
