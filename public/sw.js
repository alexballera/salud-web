if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts("fallback-Io49GaogFGMTwgc7UjWLt.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Io49GaogFGMTwgc7UjWLt/_buildManifest.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/Io49GaogFGMTwgc7UjWLt/_ssgManifest.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/29107295-2648cb5e919f7c78c7cc.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/421-4d4b8b7d8f2d941f16fd.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/681-262b1e23123b182f9c85.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/698-61a225138eb15c61145c.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/718-96ec881e1b65cf1824c0.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/78-eb00c3ad5135c995e413.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/803-f6abc989c342f79e0918.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/811-f22ca27f97efe7793644.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/877-5351d774ae4c6ce289f8.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/framework-02ad62530e7d938cfc8b.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/main-ffa32314feb96dd552b0.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/_app-33634068316e0a4bb6e1.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/_offline-169c9912a50dc8e698a6.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/components-1a10abe1a1b6623bad15.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/index-0d457bc018eaac5a392d.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/login-9a4cf0179ecd4c17741e.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/main-f61c64eb2e6351b3591f.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/preferences-586eb97f57b2c333b0e5.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/profile-3ed64fc1e1eda5c2bbc5.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/recover-0b22ae305a0619ee44e5.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/signup-91a6b97bd75811a4a51b.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/subscription-22bef004f983e76dabdd.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/pages/validate_code-d232065cdd503a505b83.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/chunks/webpack-0e0f5c5c9fa5a29e0d78.js",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/css/10c1b3a48deff9093fe9.css",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_next/static/css/8072fd71ac9500647993.css",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/_offline",revision:"Io49GaogFGMTwgc7UjWLt"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/fonts/Poppins/Poppins-Black.ttf",revision:"0573b9231a8316427ad6e751b52e87a4"},{url:"/fonts/Poppins/Poppins-BlackItalic.ttf",revision:"3fb21c8084013f3d0176bc98bcf76e60"},{url:"/fonts/Poppins/Poppins-Bold.ttf",revision:"a3e0b5f427803a187c1b62c5919196aa"},{url:"/fonts/Poppins/Poppins-BoldItalic.ttf",revision:"09775bde3e9448b38c063b746e21cb6b"},{url:"/fonts/Poppins/Poppins-ExtraBold.ttf",revision:"544fa4f2678a8285eb88b8dfe503c90c"},{url:"/fonts/Poppins/Poppins-ExtraBoldItalic.ttf",revision:"29f7dd016eeed2bcd79ba482eb3f27ec"},{url:"/fonts/Poppins/Poppins-ExtraLight.ttf",revision:"86a2f13e91ac85080ebaeaab9463b9f1"},{url:"/fonts/Poppins/Poppins-ExtraLightItalic.ttf",revision:"05139b6509a2baa8f188fbade78fc3ed"},{url:"/fonts/Poppins/Poppins-Italic.ttf",revision:"5e956c44060a7b3c0e39819ae390ab15"},{url:"/fonts/Poppins/Poppins-Light.ttf",revision:"f6ea751e936ade6edcd03a26b8153b4a"},{url:"/fonts/Poppins/Poppins-LightItalic.ttf",revision:"1eaf3af47612e6163a2e27e847c6ac7d"},{url:"/fonts/Poppins/Poppins-Medium.ttf",revision:"f61a4eb27371b7453bf5b12ab3648b9e"},{url:"/fonts/Poppins/Poppins-MediumItalic.ttf",revision:"1749e4b603749026393f64506a3bcbbe"},{url:"/fonts/Poppins/Poppins-Regular.ttf",revision:"8b6af8e5e8324edfd77af8b3b35d7f9c"},{url:"/fonts/Poppins/Poppins-SemiBold.ttf",revision:"4cdacb8f89d588d69e8570edcbe49507"},{url:"/fonts/Poppins/Poppins-SemiBoldItalic.ttf",revision:"378a091bc1b1e6e6d6327beb6bfb07b9"},{url:"/fonts/Poppins/Poppins-Thin.ttf",revision:"25cd0f688f815bc4f6ac2b71eb6278ba"},{url:"/fonts/Poppins/Poppins-ThinItalic.ttf",revision:"c93e22e98b7a8d58f83ce42b278815eb"},{url:"/icons/app-icon-1024x1024.png",revision:"595ba4793186a135415b776c13680bdb"},{url:"/icons/app-icon-152x152.png",revision:"5a8cf4690e55bdf85866c99e446c2e74"},{url:"/icons/app-icon-167x167.png",revision:"6b6933dc6478a5529e31e9bca4cfbd04"},{url:"/icons/app-icon-180x180.png",revision:"da81337df9f8a54e4e01c304a19fedd9"},{url:"/icons/app-icon-192x192.png",revision:"f0d962f9ce64bf8b64c79d9016763391"},{url:"/icons/app-icon-384x384.png",revision:"6d1a6bacff397ee159daf0c929449e31"},{url:"/icons/app-icon-512x512.png",revision:"592cafa3da234b542901d7e7afdc68c2"},{url:"/icons/apple-touch-icon.png",revision:"ab0a57046e27d4a895e2ab326480f376"},{url:"/icons/favicon-16x16.png",revision:"836d2a2d565eba3601f164fd2f9e4251"},{url:"/icons/favicon-32x32.png",revision:"09ba0622f0a188e28c3daeaa36c12cf1"},{url:"/icons/favicon.ico",revision:"a09c974624d89932e656d7e3db74bc57"},{url:"/images/register.png",revision:"2d5c2703016e156a251513b01d738383"},{url:"/manifest.json",revision:"067492ac185bfc78309261a4bd950494"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
