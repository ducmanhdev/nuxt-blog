<template>
  <article class="group border overflow-hidden rounded-2xl shadow-sm">
    <NuxtLink :to="path" class="block aspect-[3/2] overflow-hidden">
      <NuxtImg
        class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-all duration-500"
        :src="image"
        :alt="alt"
      />
    </NuxtLink>
    <div class="p-4">
      <div class="mb-2">
        <div class="flex items-center gap-1">
          <UIcon name="i-mdi-calendar" />
          {{ date }}
        </div>
        <div class="flex items-center gap-1 flex-wrap">
          <UIcon name="i-mdi-tag" />
          <template v-for="tag in tags" :key="tag">
            <span>{{ tag }}</span>
          </template>
        </div>
      </div>
      <h2 class="text-xl font-semibold group-hover:text-primary mb-1">
        <NuxtLink :to="path">{{ title }}</NuxtLink>
      </h2>
      <p class="text-ellipsis line-clamp-2 text-base mb-2">{{ description }}</p>
      <NuxtLink :to="path" class="inline-flex items-center gap-1 text-primary group-hover:underline">
        <p>Read More</p>
        <UIcon name="i-mdi-arrow-right" />
      </NuxtLink>
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
  description: 'no-description',
  image: '',
  alt: 'no-alt',
  tags: () => [],
});
</script>

<style scoped></style>
