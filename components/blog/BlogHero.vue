<template>
  <article class="text-center">
    <h1 class="text-xl md:text-3xl lg:text-4xl font-bold mb-5">{{ title }}</h1>
    <NuxtImg
      :src="thumbnail"
      :alt="thumbnailAlt"
      class="w-full max-w-lg mx-auto rounded-2xl aspect-[3/2] object-cover content-center mb-5"
    />
    <p class="text-zinc-600 dark:text-zinc-400 mb-4">{{ summary }}</p>
    <div class="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
      <div class="flex items-center gap-1">
        <UIcon name="i-mdi-calendar" />
        {{ dayjs(createdAt).format(DATE_TIME_FORMAT) }}
      </div>
      <div class="flex items-center gap-1 flex-wrap">
        <UIcon name="i-mdi-tag" />
        <UBadge v-for="category in categories" :key="category" :label="category" color="gray" variant="solid" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Props {
  title: string;
  createdAt: string;
  summary: string;
  thumbnail: string;
  thumbnailAlt: string;
  categories: string[];
}

withDefaults(defineProps<Props>(), {
  title: 'no title',
  createdAt: 'no date',
  summary: 'no summary',
  thumbnail: '',
  thumbnailAlt: 'no-alt',
  categories: () => [],
});
</script>
