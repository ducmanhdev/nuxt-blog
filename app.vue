<template>
  <div class="min-h-screen flex flex-col color-theme">
    <MainHeader class="shrink-0" />
    <main class="grow">
      <div class="h-full color-theme">
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
      </div>
    </main>
    <MainFooter class="shrink-0" />
    <Teleport to="body">
      <UButton
        v-if="currentScrollPosition > 100"
        icon="i-mdi-arrow-up"
        color="primary"
        square
        :ui="{ rounded: 'rounded-full' }"
        class="fixed bottom-4 right-4"
        @click="handleScrollToTop"
      />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore();
const { data } = useAuth();

if (data.value) {
  await useAsyncData('user', () => userStore.fetchUser().then(() => true));
}

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const currentScrollPosition = ref(0);
const handleTrackWindowScrollPosition = () => {
  currentScrollPosition.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleTrackWindowScrollPosition);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleTrackWindowScrollPosition);
});
</script>
<style></style>
