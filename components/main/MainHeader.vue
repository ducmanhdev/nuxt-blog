<template>
  <header class="color-theme sticky top-0 z-50 py-4 shadow border-b">
    <div class="container flex items-center justify-between">
      <NuxtLink to="/" class="text-base sm:text-2xl font-bold underline">Blog's</NuxtLink>
      <nav class="text-sm sm:text-lg font-semibold">
        <ul class="flex items-center gap-3 sm:gap-6">
          <li>
            <NuxtLink to="/blogs">Blogs</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/categories">Categories</NuxtLink>
          </li>
          <li>
            <UDropdown v-if="data?.user" :items="profileLinks" :popper="{ placement: 'bottom-end' }" class="flex">
              <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
            </UDropdown>
            <NuxtLink v-else to="/login">Login</NuxtLink>
          </li>
          <li>
            <UButton
              variant="ghost"
              :icon="colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              class="text-2xl text-yellow-500 dark:text-blue-500"
              :ui="{
                icon: {
                  size: 'xl',
                },
              }"
              @click="toggleColorMode"
            />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const toast = useToast();
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.value === 'dark' ? (colorMode.preference = 'light') : (colorMode.preference = 'dark');
};

const { data, signOut } = useAuth();
const handleSignOut = async () => {
  try {
    await signOut({ callbackUrl: '/' });
    toast.add({
      title: 'Signed out successfully',
    });
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    });
  }
};

const profileLinks = computed(() => [
  [
    {
      label: data.value?.user?.email,
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user-circle-20-solid',
      to: '/profile',
    },
  ],
  [
    {
      label: 'Bookmarks',
      icon: 'i-heroicons-bookmark-20-solid',
    },
  ],
  [
    {
      label: 'Write a blog',
      icon: 'i-heroicons-pencil-20-solid',
      to: '/profile/write',
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
      click: handleSignOut,
    },
  ],
]);
</script>

<style scoped></style>
