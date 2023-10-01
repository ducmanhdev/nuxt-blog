<template>
  <div class="sticky top-[100px] flex flex-col items-center">
    <div class="flex flex-col items-center gap-2 text-center mb-7">
      <UButton icon="i-mdi-chevron-up" color="gray"/>
      <p class="font-semibold text-xl">12</p>
      <UButton icon="i-mdi-chevron-down" color="gray"/>
    </div>
    <UButton icon="i-mdi-bookmark" color="gray" square :ui="{ rounded: 'rounded-full' }"/>
  </div>
</template>

<script setup lang="ts">
const {path} = useRoute();
const article = await queryContent(path).findOne();
const links = article.body.toc?.links;

</script>