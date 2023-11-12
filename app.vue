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
  </div>
</template>
<script setup lang="ts"></script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
