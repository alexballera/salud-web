/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_GRAPHQL_URLBASE: process.env.NEXT_PUBLIC_GRAPHQL_URLBASE,
    NEXT_PUBLIC_CMS_GRAPHQL_APIKEY: process.env.NEXT_PUBLIC_CMS_GRAPHQL_APIKEY
  },
  future: {
    webpack5: true
  }
});
