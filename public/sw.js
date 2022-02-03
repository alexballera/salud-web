if (!self.define) {
  const s = s => {
      'require' !== s && (s += '.js');
      let e = Promise.resolve();
      return (
        n[s] ||
          (e = new Promise(async e => {
            if ('document' in self) {
              const n = document.createElement('script');
              (n.src = s), document.head.appendChild(n), (n.onload = e);
            } else importScripts(s), e();
          })),
        e.then(() => {
          if (!n[s]) throw new Error(`Module ${s} didn’t register its module`);
          return n[s];
        })
      );
    },
    e = (e, n) => {
      Promise.all(e.map(s)).then(s => n(1 === s.length ? s[0] : s));
    },
    n = { require: Promise.resolve(e) };
  self.define = (e, c, i) => {
    n[e] ||
      (n[e] = Promise.resolve().then(() => {
        let n = {};
        const a = { uri: location.origin + e.slice(1) };
        return Promise.all(
          c.map(e => {
            switch (e) {
              case 'exports':
                return n;
              case 'module':
                return a;
              default:
                return s(e);
            }
          })
        ).then(s => {
          const e = i(...s);
          return n.default || (n.default = e), n;
        });
      }));
  };
}
define('./sw.js', ['./workbox-4a677df8'], function (s) {
  'use strict';
  importScripts('fallback-HCKRA-u4cTLsVPx7Xsb-I.js'),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: '/_next/static/HCKRA-u4cTLsVPx7Xsb-I/_buildManifest.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/HCKRA-u4cTLsVPx7Xsb-I/_ssgManifest.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/122-3074ebbe91f2d8a4f506.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/204-e6824185b1cd0f0213b7.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/29107295-62449f6ab50432c0efef.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/373-8dd8929fd4cc1e401c45.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/391-804c83e56c61cd874d59.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/501-ac46e8439c0652f312de.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/56-99c616e26ec8445819b8.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/597-e6b858dc0c4aecf0d284.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/611-16e95a86a3f23fdcc100.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/643-1533a585d18616a7c6b6.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/649-d677c8f2b94dc2151de6.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/669-599705fccf669cc64e66.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/779-2f046d1d852244dc1ca0.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/797-5fc61f683a7b9cdd29f5.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/856-5d70edc64ec2fa359713.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/905-2d4fe15f65f8ac8d2c00.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/framework-80c68b267d9ec60ea996.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/main-b4730850200ffe10c86b.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/_app-5bab82e988e79829d368.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/_error-ea939aab753d9e9db3bd.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/_offline-70911df1228606e2756e.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/beneficiary/%5Bbeneficiary-id%5D-dc07378f66067b66bd0a.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/components-73cbb490a602a11f4269.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/help-f3ba519e0022db2e9d61.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/index-6e4eb2d95ea4379ef5bf.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/login-9ef0b1a2a7c41e1320f3.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/logout-4bebb0934cfbcd277469.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/main-31fd76783f8882ea787b.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/preferences-ee67c40dcd6c65741dc0.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/preferences/language-f1c26914aa8d3fb8ce68.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/preferences/notifications-2cbb0ea969565d040414.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/profile-038df3e485b4360fae0b.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/recover_password-23c6c09dba6e1843dbd3.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/recover_password/change_password-7d71a221673d9b21d9cd.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/recover_password/forward_email-82eb94215ea80b0a08b1.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/signup-f8eab6c9c4e2827d011e.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/subscriptions-ee50243688718cf1c076.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/subscriptions/beneficiaries-5a5100727dfc18d97e8f.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateActions-8bd0f6508fc8eca520cb.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateContent-e678302e15cbf3767304.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateEmail-e3f90b0cbc797b06c785.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdateHeader-6a4a7631c4d28d939a3a.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdatePassword-6e866d1cc49862d40ab3.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/components/UpdatePhone-0c24edef2f47f0be9337.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/email-4ced09fa10d4bcd895d4.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/password-2ea8a0612c8e30386ed9.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/pages/update/phone-ce45d1054ade86c7c06f.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        {
          url: '/_next/static/chunks/webpack-613fd858cdb9cf2af3be.js',
          revision: 'HCKRA-u4cTLsVPx7Xsb-I'
        },
        { url: '/_next/static/css/4cab657cab8cf6ad7094.css', revision: 'HCKRA-u4cTLsVPx7Xsb-I' },
        { url: '/_next/static/css/5500ba7e66db13437667.css', revision: 'HCKRA-u4cTLsVPx7Xsb-I' },
        { url: '/_offline', revision: 'HCKRA-u4cTLsVPx7Xsb-I' },
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
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: s, response: e, event: n, state: c }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, { status: 200, statusText: 'OK', headers: e.headers })
                : e
          },
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new s.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new s.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp4)$/i,
      new s.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        const e = s.pathname;
        return !e.startsWith('/api/auth/') && !!e.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        return !s.pathname.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    ),
    s.registerRoute(
      ({ url: s }) => !(self.origin === s.origin),
      new s.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: s }) => self.fallback(s) }
        ]
      }),
      'GET'
    );
});
