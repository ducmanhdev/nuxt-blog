import { ofetch } from 'ofetch';

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      options.headers = useRequestHeaders(['cookie']) as HeadersInit;
    },
    onResponseError({ request, response }) {
      console.log('[fetch response error]', request, response.status, response.body);
      if (response.status === 401 && !request.toString().endsWith('callback/credentials')) {
        const { signOut } = useAuth();
        signOut({ callbackUrl: '/login' });
      }
    },
  });
});
