<template>
  <section class="pb-10">
    <div class="container">
      <h2 class="section-title">Trending Post</h2>
      <div v-if="data?.data?.length" class="space-y-4">
        <template v-for="post in data?.data" :key="post._id">
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
      </div>
      <BlogEmpty v-else />
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
const { data } = await useFetch('/api/post/all', {
  query: {
    limit: 3,
  },
});
</script>

<style scoped></style>
