const CACHE_PREFIX = "zameett-assets-";

self.addEventListener("install", () => {
  // Do not prefetch pages during install. This keeps PWA registration light and
  // avoids spending Hostinger processes on routes the visitor may never open.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data?.json() || {};
  } catch {
    payload = { body: event.data?.text() || "Your Zameett account has a new update." };
  }

  const title = payload.title || "Zameett update";
  const options = {
    body: payload.body || "There is new activity in your Zameett account.",
    icon: "/icon.png",
    badge: "/icon.png",
    tag: payload.tag || "zameett-account-update",
    renotify: true,
    data: { url: payload.url || "/account" },
    actions: [{ action: "open", title: "View update" }],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const destination = new URL(event.notification.data?.url || "/account", self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => client.url.startsWith(self.location.origin));
      if (existing) {
        existing.navigate(destination);
        return existing.focus();
      }
      return self.clients.openWindow(destination);
    }),
  );
});
