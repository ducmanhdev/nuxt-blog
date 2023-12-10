import { ofetch } from 'ofetch';

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      options.headers = useRequestHeaders(['cookie']) as HeadersInit;
    },
    onResponseError({ request, response }) {
      // Log error
      console.log('[fetch response error]', request, response.status, response.body);
      if (response.status === 403) {
        navigateTo('/login');
      }
    },
    onRequestError({ request, error }) {
      // Log error
      console.log('[fetch request error]', request, error);
    },
  });
});
