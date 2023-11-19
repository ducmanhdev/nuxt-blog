// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'layout', mode: 'out-in' },
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
    'nuxt-server-utils',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    storageKey: 'nuxt-color-mode',
  },
  ui: {
    icons: ['mdi', 'ion'],
  },
  nuxtServerUtils: {
    enabled: true, // default3
    enableDevTools: true, // default
    mongodbUri: process.env.MONGODB_URI,
  },
  auth: {
    globalAppMiddleware: false,
    provider: {
      type: 'authjs',
    },
  },
});
