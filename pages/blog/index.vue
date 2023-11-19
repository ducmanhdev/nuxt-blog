<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title">Blog</h1>
      <div class="space-y-4">
        <template v-if="data?.length">
          <template v-for="post in data" :key="post.title">
            <BlogHorizontal
              :slug="post.slug"
              :title="post.title"
              :created-at="post.createdAt"
              :summary="post.description"
              :thumbnail="post.thumbnail"
              :thumbnail-alt="post.thumbnailAlt"
              :tags="post.tags"
            />
          </template>
          <div class="flex justify-center">
            <UPagination v-model="page" :page-count="5" :total="data?.length" />
          </div>
        </template>
        <BlogEmpty v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const page = ref(1);
const { data } = await useFetch('/api/posts');
</script>

<style scoped></style>
