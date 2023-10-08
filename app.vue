<template>
  <div class="min-h-screen color-theme">
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator/>
        <NuxtPage/>
        <UNotifications />
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
</script>

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