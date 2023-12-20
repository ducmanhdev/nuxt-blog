<template>
  <NuxtLink
    :to="`/blog?category=${title}`"
    class="text-md sm:text-lg font-extrabold text-zinc-300 px-4 py-2 sm:px-5 sm:py-3 rounded hover:underline rand-bg-color hover:scale-[1.05] transition-all duration-500"
  >
    #{{ title }}
  </NuxtLink>
</template>
<script setup lang="ts">
interface Props {
  title: string;
}

withDefaults(defineProps<Props>(), {
  title: 'No title available',
});

const color = [
  '#dc2626',
  '#d97706',
  '#65a30d',
  '#059669',
  '#0891b2',
  '#0284c7',
  '#4f46e5',
  '#7c3aed',
  '#c026d3',
  '#db2777',
];

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const picAColor = ref(`${color.at(getRandomInt(0, 8))}`);
</script>

<style :scoped>
.rand-bg-color {
  background-color: v-bind(picAColor);
}
</style>
