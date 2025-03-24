let cacheData = "appV1";

/**
*  서비스 워커 설치
*/
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/app/index.css",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cacheData) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", (event) => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.message,
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }

        const responseToCache = fetchResponse.clone();
        caches.open(cacheData).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return fetchResponse;
      });
    })
  );
});
