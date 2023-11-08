// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  imports: {
    dirs: ['./constants'],
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtseo/module',
    '@formkit/auto-animate',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
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
  content: {
    highlight: {
      theme: 'dracula',
    },
  },
});
