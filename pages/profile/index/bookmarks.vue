<template>
  <div>
    <h1 class="section-title">Bookmarks</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <template v-if="data?.length">
        <template v-for="post in data" :key="post._id">
          <BlogVertical
            :slug="post.slug"
            :title="post.title"
            :created-at="post.createdAt"
            :summary="post.summary"
            :thumbnail="post.thumbnail"
            :thumbnail-alt="post.title"
            :tags="post.tags"
          />
        </template>
      </template>
      <BlogEmpty v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/bookmarks');
</script>

<style scoped></style>
