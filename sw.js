// sw.js
const CACHE_NAME = 'ungidos-del-rey-de-reyes-cache-v1';
const urlsToCache = [
    '/',
    '/saultula81.ungidos.io/index.html',
    '/saultula81.ungidos.io/manifest.json',
    '/saultula81.ungidos.io/style.css',
    '/saultula81.ungidos.io/script.js',
    '/saultula81.ungidos.io/assets/icons',
    // Agrega otros archivos que desees almacenar en caché
];

// Instalar el Service Worker y almacenar en caché los archivos estáticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activar el Service Worker y limpiar los cachés antiguos
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar las solicitudes de la página y devolver los recursos desde el caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si el recurso está en caché, lo devuelve
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si no está en caché, hace una solicitud de red
                return fetch(event.request);
            })
    );
});
