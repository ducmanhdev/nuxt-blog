<template>
  <section class="pb-10">
    <div class="container">
      <h2 class="section-title">Recent Post</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <template v-if="data?.data?.length">
          <template v-for="post in data?.data" :key="post._id">
            <BlogVertical
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
      <div class="text-center mt-4">
        <UButton to="/blog">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </template>
          Read all
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/posts', {
  query: {
    limit: 3,
  },
});
</script>

<style scoped></style>
