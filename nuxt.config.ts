// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width,initial-scale=1',
            title: 'Riyad\'s Blog',
            titleTemplate: '%s - Riyad\'s Blog',
            meta: [{name: 'description', content: 'Riyad\'s awesome blog'}],
        },
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'layout', mode: 'out-in'},
    },
    modules: [
        '@nuxtjs/eslint-module',
        '@nuxtseo/module',
        '@formkit/auto-animate',
        '@nuxtjs/color-mode',
        '@nuxt/content',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/tailwindcss'
    ],
    colorMode: {
        preference: 'system',
        fallback: 'light',
        classPrefix: '',
        storageKey: 'nuxt-color-mode'
    }
})
