<template>
  <div>
    <CategoryHero />
    <div class="pb-10">
      <div class="container">
        <div class="flex flex-wrap gap-4">
          <CategoryBadge v-for="category in BLOG_CATEGORIES" :key="category" :title="category" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
