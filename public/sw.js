if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js');
      let s = Promise.resolve();
      return (
        r[e] ||
          (s = new Promise(async s => {
            if ('document' in self) {
              const r = document.createElement('script');
              (r.src = e), document.head.appendChild(r), (r.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!r[e]) throw new Error(`Module ${e} didn’t register its module`);
          return r[e];
        })
      );
    },
    s = (s, r) => {
      Promise.all(s.map(e)).then(e => r(1 === e.length ? e[0] : e));
    },
    r = { require: Promise.resolve(s) };
  self.define = (s, n, i) => {
    r[s] ||
      (r[s] = Promise.resolve().then(() => {
        let r = {};
        const a = { uri: location.origin + s.slice(1) };
        return Promise.all(
          n.map(s => {
            switch (s) {
              case 'exports':
                return r;
              case 'module':
                return a;
              default:
                return e(s);
            }
          })
        ).then(e => {
          const s = i(...e);
          return r.default || (r.default = s), r;
        });
      }));
  };
}
define('./sw.js', ['./workbox-ea903bce'], function (e) {
  'use strict';
  importScripts('fallback-UosFidOj5oCfMH3llf0He.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/UosFidOj5oCfMH3llf0He/_buildManifest.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/UosFidOj5oCfMH3llf0He/_ssgManifest.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/23-8fe1f925a2158cb79147.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/286-3da5cc377bceb83cc9fb.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/318-23478b46066b7341e632.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/framework-2191d16384373197bc0a.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/main-173e16f84e46bc18352f.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/pages/_app-9e14d3edf6592002257f.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/pages/_error-e69890b6db18dcbc6fa4.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/pages/_offline-9c65dc58bcc98f8e2b62.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/pages/index-be7df2c04b099dffdd38.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/pages/login-97812150f1596042d7e4.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/pages/signup-4331bd96e19d19d67f56.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/polyfills-eef578260fd80f8fff94.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        {
          url: '/_next/static/chunks/webpack-189c53927ffd3caf09c3.js',
          revision: 'UosFidOj5oCfMH3llf0He'
        },
        { url: '/_next/static/css/a0696865a4572659b89f.css', revision: 'UosFidOj5oCfMH3llf0He' },
        { url: '/_next/static/css/cc82a30ba996601ffed3.css', revision: 'UosFidOj5oCfMH3llf0He' },
        { url: '/_offline', revision: 'UosFidOj5oCfMH3llf0He' },
        { url: '/favicon.ico', revision: '21b739d43fcb9bbb83d8541fe4fe88fa' },
        { url: '/icons/app-icon-1024x1024.png', revision: '595ba4793186a135415b776c13680bdb' },
        { url: '/icons/app-icon-152x152.png', revision: '5a8cf4690e55bdf85866c99e446c2e74' },
        { url: '/icons/app-icon-167x167.png', revision: '6b6933dc6478a5529e31e9bca4cfbd04' },
        { url: '/icons/app-icon-180x180.png', revision: 'da81337df9f8a54e4e01c304a19fedd9' },
        { url: '/icons/app-icon-192x192.png', revision: 'f0d962f9ce64bf8b64c79d9016763391' },
        { url: '/icons/app-icon-384x384.png', revision: '6d1a6bacff397ee159daf0c929449e31' },
        { url: '/icons/app-icon-512x512.png', revision: '592cafa3da234b542901d7e7afdc68c2' },
        { url: '/icons/apple-touch-icon.png', revision: 'ab0a57046e27d4a895e2ab326480f376' },
        { url: '/icons/favicon-16x16.png', revision: '836d2a2d565eba3601f164fd2f9e4251' },
        { url: '/icons/favicon-32x32.png', revision: '09ba0622f0a188e28c3daeaa36c12cf1' },
        { url: '/icons/favicon.ico', revision: 'a09c974624d89932e656d7e3db74bc57' },
        { url: '/images/register.png', revision: '2d5c2703016e156a251513b01d738383' },
        { url: '/manifest.json', revision: '067492ac185bfc78309261a4bd950494' },
        { url: '/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: r, state: n }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-media-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    );
});
