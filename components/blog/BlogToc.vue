<template>
  <div class="sticky top-[100px] border p-4 rounded-md text-sm">
    <p class="font-bold border-b pb-2 mb-3">Table Of Content</p>
    <nav>
      <ul class="space-y-3">
        <li v-for="link in links" :key="link.id">
          <NuxtLink :to="`#${link.id}`" replace class="block hover:underline">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { path } = useRoute();
const article = await queryContent(path).findOne();
const links = article.body.toc?.links;
</script>