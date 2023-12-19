<template>
  <div class="py-10">
    <div class="container">
      <div class="grid grid-cols-[250px_1fr] gap-6">
        <aside class="">
          <UVerticalNavigation :links="links" />
        </aside>
        <section class="">
          <NuxtPage />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  redirect: '/profile/setting',
});
const links = [
  {
    label: 'Setting',
    icon: 'i-mdi-account-details',
    to: '/profile/setting',
  },
  {
    label: 'Password',
    icon: 'i-mdi-form-textbox-password',
    to: '/profile/password',
  },
  {
    label: 'Created post',
    icon: 'i-mdi-book-open-page-variant',
    to: '/profile/created-posts',
  },
  {
    label: 'Bookmarks',
    icon: 'i-mdi-bookmark',
    to: '/profile/bookmarks',
  },
  {
    label: 'Write',
    icon: 'i-mdi-pencil',
    to: '/profile/write',
  },
];
</script>

<style scoped></style>
