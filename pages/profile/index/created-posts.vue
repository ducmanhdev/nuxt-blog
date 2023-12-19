<template>
  <div>
    <h1 class="section-title">Created posts</h1>
    <div v-if="error" class="text-error">{{ error.message }}</div>
    <div v-else-if="data?.data?.length">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlogVertical
          v-for="post in data.data"
          :key="post.id"
          :slug="post.slug"
          :title="post.title"
          :created-at="post.createdAt"
          :summary="post.summary"
          :thumbnail="post.thumbnail"
          :thumbnail-alt="post.title"
          :tags="post.tags"
        />
      </div>
      <div class="flex justify-center mt-4">
        <UPagination v-model="page" :page-count="data.metadata.itemsPerPage" :total="data.metadata.totalItems" />
      </div>
    </div>
    <BlogEmpty v-else />
  </div>
</template>

<script setup lang="ts">
const page = ref(1);
const { data, error } = await useFetch('/api/created-posts', {
  query: {
    page,
  },
  server: false,
  watch: [page],
});
</script>

<style scoped></style>
