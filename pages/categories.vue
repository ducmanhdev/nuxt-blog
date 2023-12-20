<template>
  <div>
    <CategoryHero />
    <div class="pb-10">
      <div class="container">
        <div class="flex flex-wrap gap-4">
          <CategoryBadge v-for="topic in topics" :key="topic" :title="topic" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const topics = [
  'javascript',
  'typescript',
  'git',
  'docker',
  'kubernetes',
  'vue',
  'nuxt',
  'pinia',
  'vuex',
  'firebase',
  'supabase',
  'cypress',
  'vercel',
  'namecheap',
];
</script>

<style scoped></style>
