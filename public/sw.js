if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js');
      let s = Promise.resolve();
      return (
        i[e] ||
          (s = new Promise(async s => {
            if ('document' in self) {
              const i = document.createElement('script');
              (i.src = e), document.head.appendChild(i), (i.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    s = (s, i) => {
      Promise.all(s.map(e)).then(e => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(s) };
  self.define = (s, n, a) => {
    i[s] ||
      (i[s] = Promise.resolve().then(() => {
        let i = {};
        const c = { uri: location.origin + s.slice(1) };
        return Promise.all(
          n.map(s => {
            switch (s) {
              case 'exports':
                return i;
              case 'module':
                return c;
              default:
                return e(s);
            }
          })
        ).then(e => {
          const s = a(...e);
          return i.default || (i.default = s), i;
        });
      }));
  };
}
define('./sw.js', ['./workbox-4a677df8'], function (e) {
  'use strict';
  importScripts('fallback-y4ucxoGgJHoRiwmba4KQI.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/204-e6824185b1cd0f0213b7.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/29107295-62449f6ab50432c0efef.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/313-afd3d5d1c45cfbf48376.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/391-804c83e56c61cd874d59.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/501-ac46e8439c0652f312de.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/533-0560a3889cfb78d04487.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/547-f31e4588e0e91c6e8173.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/56-2452bf93923f3aa64ebe.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/643-1533a585d18616a7c6b6.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/649-d677c8f2b94dc2151de6.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/681-8865dc309dd853cc209b.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/779-2f046d1d852244dc1ca0.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/788-be13097d2412919e942f.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/797-f12b4706c3c4a5ba597d.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/798-6b4cc2bc68c4707c807d.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/847-d8f62625691e75cc2b06.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/framework-80c68b267d9ec60ea996.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/main-b4730850200ffe10c86b.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/_app-6e7c54e7b1ca5e6a0998.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/_error-ea939aab753d9e9db3bd.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/_offline-70911df1228606e2756e.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/beneficiary/%5Bbeneficiary-id%5D-96f5875b3d5f63178f38.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/components-4d7e27cad45d462010fc.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/help-f3ba519e0022db2e9d61.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/index-e7aee1617bbbe81cf550.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/login-f81f4e2abe3a1b4f382d.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/logout-589e400cf42974206bf5.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/main-31fd76783f8882ea787b.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/preferences-ee67c40dcd6c65741dc0.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/preferences/language-6c067b0e201c040872a1.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/preferences/notifications-2cbb0ea969565d040414.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/profile-32d22b5dcfc07d6cce02.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/recover-24409a243b5db6ea5b12.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/recover/confirmation-bfed4e6b2ea6759d4fad.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/signup-47fa46c557c613e84bf7.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/subscriptions-70bcd98336a23b7159cb.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/subscriptions/beneficiaries-5a5100727dfc18d97e8f.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateActions-06e6f71bbbf56f62b3c0.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateContent-e678302e15cbf3767304.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateEmail-37e607bae90b6141622f.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateHeader-6a4a7631c4d28d939a3a.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdatePassword-66b88d1339a4f73b638a.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdatePhone-d696c1fd44d1736d9a34.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/email-0cd6cdbdd11a38dc18d0.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/password-06e183775e1ab11d00db.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/update/phone-71fd127d576a41e2f4f4.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/pages/validate_code-6f9d3ce4c7d4c0ebbd8b.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/chunks/webpack-613fd858cdb9cf2af3be.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        { url: '/_next/static/css/5500ba7e66db13437667.css', revision: 'y4ucxoGgJHoRiwmba4KQI' },
        { url: '/_next/static/css/fbc5dc8e3be3bfaa44a5.css', revision: 'y4ucxoGgJHoRiwmba4KQI' },
        {
          url: '/_next/static/y4ucxoGgJHoRiwmba4KQI/_buildManifest.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        {
          url: '/_next/static/y4ucxoGgJHoRiwmba4KQI/_ssgManifest.js',
          revision: 'y4ucxoGgJHoRiwmba4KQI'
        },
        { url: '/_offline', revision: 'y4ucxoGgJHoRiwmba4KQI' },
        { url: '/favicon.ico', revision: '21b739d43fcb9bbb83d8541fe4fe88fa' },
        { url: '/fonts/Poppins/Poppins-Black.ttf', revision: '0573b9231a8316427ad6e751b52e87a4' },
        {
          url: '/fonts/Poppins/Poppins-BlackItalic.ttf',
          revision: '3fb21c8084013f3d0176bc98bcf76e60'
        },
        { url: '/fonts/Poppins/Poppins-Bold.ttf', revision: 'a3e0b5f427803a187c1b62c5919196aa' },
        {
          url: '/fonts/Poppins/Poppins-BoldItalic.ttf',
          revision: '09775bde3e9448b38c063b746e21cb6b'
        },
        {
          url: '/fonts/Poppins/Poppins-ExtraBold.ttf',
          revision: '544fa4f2678a8285eb88b8dfe503c90c'
        },
        {
          url: '/fonts/Poppins/Poppins-ExtraBoldItalic.ttf',
          revision: '29f7dd016eeed2bcd79ba482eb3f27ec'
        },
        {
          url: '/fonts/Poppins/Poppins-ExtraLight.ttf',
          revision: '86a2f13e91ac85080ebaeaab9463b9f1'
        },
        {
          url: '/fonts/Poppins/Poppins-ExtraLightItalic.ttf',
          revision: '05139b6509a2baa8f188fbade78fc3ed'
        },
        { url: '/fonts/Poppins/Poppins-Italic.ttf', revision: '5e956c44060a7b3c0e39819ae390ab15' },
        { url: '/fonts/Poppins/Poppins-Light.ttf', revision: 'f6ea751e936ade6edcd03a26b8153b4a' },
        {
          url: '/fonts/Poppins/Poppins-LightItalic.ttf',
          revision: '1eaf3af47612e6163a2e27e847c6ac7d'
        },
        { url: '/fonts/Poppins/Poppins-Medium.ttf', revision: 'f61a4eb27371b7453bf5b12ab3648b9e' },
        {
          url: '/fonts/Poppins/Poppins-MediumItalic.ttf',
          revision: '1749e4b603749026393f64506a3bcbbe'
        },
        { url: '/fonts/Poppins/Poppins-Regular.ttf', revision: '8b6af8e5e8324edfd77af8b3b35d7f9c' },
        {
          url: '/fonts/Poppins/Poppins-SemiBold.ttf',
          revision: '4cdacb8f89d588d69e8570edcbe49507'
        },
        {
          url: '/fonts/Poppins/Poppins-SemiBoldItalic.ttf',
          revision: '378a091bc1b1e6e6d6327beb6bfb07b9'
        },
        { url: '/fonts/Poppins/Poppins-Thin.ttf', revision: '25cd0f688f815bc4f6ac2b71eb6278ba' },
        {
          url: '/fonts/Poppins/Poppins-ThinItalic.ttf',
          revision: 'c93e22e98b7a8d58f83ce42b278815eb'
        },
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
        { url: '/manifest.json', revision: '29dda4d4f21cd4293c4c00071cbd4e29' },
        { url: '/vercel.svg', revision: '26bf2d0adaf1028a4d4c6ee77005e819' }
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
            cacheWillUpdate: async ({ request: e, response: s, event: i, state: n }) =>
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
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
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
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
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
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    );
});
