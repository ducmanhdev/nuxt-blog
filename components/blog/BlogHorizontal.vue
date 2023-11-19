<template>
  <article class="group border overflow-hidden rounded-2xl shadow-sm sm:grid grid-cols-[300px_1fr] items-center">
    <NuxtLink :to="to" class="block self-stretch overflow-hidden">
      <NuxtImg
        class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-all duration-500"
        :src="thumbnail"
        :alt="thumbnailAlt"
      />
    </NuxtLink>
    <div class="p-5">
      <h4 class="text-xl font-semibold group-hover:text-primary mb-1">
        <NuxtLink :to="to">{{ title }}</NuxtLink>
      </h4>
      <p class="text-ellipsis line-clamp-2 text-base mb-3">{{ summary }}</p>
      <div class="flex items-center flex-wrap gap-y-2 gap-x-4 mb-3">
        <div class="flex items-center gap-1">
          <UIcon name="i-mdi-calendar" />
          {{ dayjs(createdAt).format(DATE_TIME_FORMAT) }}
        </div>
        <div class="flex items-center gap-1 flex-wrap">
          <UIcon name="i-mdi-tag" />
          <template v-for="tag in tags" :key="tag">
            <span>{{ tag }}</span>
          </template>
        </div>
      </div>
      <NuxtLink :to="to" class="inline-flex items-center gap-1 text-primary group-hover:underline">
        <p>Read More</p>
        <UIcon name="i-mdi-arrow-right" />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Props {
  slug: string;
  title: string;
  summary: string;
  createdAt: string;
  thumbnail: string;
  thumbnailAlt: string;
  tags: Array<string>;
}

const props = defineProps<Props>();
const to = computed(() => `/blog/${props.slug}`);
</script>

<style scoped></style>
