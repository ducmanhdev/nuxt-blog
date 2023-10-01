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
            <NuxtLink to="/blogs">Categories</NuxtLink>
          </li>
          <li>
            <UButton
                variant="ghost"
                :icon="colorMode.value === 'dark' ? 'i-heroicons-moon': 'i-heroicons-sun'"
                class="text-2xl text-yellow-500 dark:text-blue-500"
                @click="toggleColorMode"
                :ui="{
                  icon: {
                    size: 'xl',
                  }
                }"
            />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.value === 'dark'
      ? colorMode.preference = 'light'
      : colorMode.preference = 'dark'
}
</script>

<style scoped>

</style>