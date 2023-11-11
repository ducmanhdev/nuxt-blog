<template>
  <article class="text-center">
    <h1 class="text-xl md:text-3xl lg:text-4xl font-bold mb-5">{{ title }}</h1>
    <NuxtImg
      :src="image"
      :alt="alt"
      class="w-full max-w-lg mx-auto rounded-2xl aspect-[3/2] object-cover content-center mb-5"
    />
    <p class="text-zinc-600 dark:text-zinc-400 mb-4">{{ description }}</p>
    <div class="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
      <div class="flex items-center gap-1">
        <UIcon name="i-mdi-calendar" />
        {{ date }}
      </div>
      <div class="flex items-center gap-1 flex-wrap">
        <UIcon name="i-mdi-tag" />
        <UBadge v-for="tag in tags" :key="tag" :label="tag" color="gray" variant="solid" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
}
withDefaults(defineProps<Props>(), {
  title: 'no-title',
  date: 'no-date',
  description: 'no description',
  image: '',
  alt: 'no-alt',
  tags: () => [],
});
</script>
