<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title">Top 10 trending</h1>
      <div class="space-y-4">
        <template v-if="data?.data?.length">
          <template v-for="post in data?.data" :key="post.title">
            <BlogHorizontal
              :slug="post.slug"
              :title="post.title"
              :created-at="post.createdAt"
              :summary="post.summary"
              :thumbnail="post.thumbnail"
              :thumbnail-alt="post.title"
              :categories="post.categories"
            />
          </template>
        </template>
        <BlogEmpty v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/top-10-trending');
</script>

<style scoped></style>
