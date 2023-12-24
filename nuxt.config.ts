// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    mongodbUri: process.env.MONGODB_URI,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        },
      ],
    },
  },
  imports: {
    dirs: ['./constants'],
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtseo/module',
    '@formkit/auto-animate',
    '@nuxt/image',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],
  nitro: {
    plugins: ['~/server/plugins/mongodb.ts'],
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    storageKey: 'nuxt-color-mode',
  },
  ui: {
    icons: ['mdi', 'ion'],
  },
  auth: {
    baseURL: 'http://localhost:3000',
    globalAppMiddleware: false,
    provider: {
      type: 'authjs',
    },
  },
});
