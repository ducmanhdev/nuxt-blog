import type { IUser } from '~/server/models/User';

type User = Omit<IUser, 'password'> & {};
export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async refreshUser() {
      this.user = await $fetch('/api/profile/info');
    },
    async fetchUser() {
      const { data } = await useFetch('/api/profile/info');
      if (data.value) {
        this.user = data.value;
      }
    },
  },
});
