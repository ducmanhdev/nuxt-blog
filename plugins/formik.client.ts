import {autoAnimatePlugin} from '@formkit/auto-animate/vue';

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.vueApp.use(autoAnimatePlugin);
})
