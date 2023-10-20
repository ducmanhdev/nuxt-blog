<template>
  <section class="pb-10">
    <div class="container">
      <h2 class="section-title">Recent Post</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <template v-if="data?.length" v-for="post in data" :key="post.title">
          <BlogVertical
            :path="post._path"
            :title="post.title"
            :date="post.date"
            :description="post.description"
            :image="post.image"
            :alt="post.alt"
            :og-image="post.ogImage"
            :tags="post.tags"
          />
        </template>
        <BlogEmpty v-else />
      </div>
      <div class="text-center mt-4">
        <UButton to="/blogs">
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
const { data } = await useAsyncData('recent-post', () =>
  queryContent('/blogs').where({ published: true }).limit(3).sort({ _id: -1 }).find(),
);
</script>

<style scoped></style>
