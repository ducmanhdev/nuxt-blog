<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title">{{ title }}</h1>
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
          <div class="flex justify-center">
            <UPagination v-model="page" :page-count="data.metadata.itemsPerPage" :total="data.metadata.totalItems" />
          </div>
        </template>
        <BlogEmpty v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const page = ref(1);
const currentCategory = computed(() => route.query.category);
const title = computed(() => (route.query.category ? `#${route.query.category}` : 'Blog'));
const { data } = await useFetch('/api/posts', {
  query: {
    page,
    categories: currentCategory,
  },
  watch: [page, currentCategory],
});
</script>

<style scoped></style>
