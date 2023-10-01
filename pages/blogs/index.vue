<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title">Blogs</h1>
      <div class="space-y-4">
        <template v-if="data?.length">
          <template v-for="post in data" :key="post.title">
            <BlogHorizontal
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
          <div class="flex justify-center">
            <UPagination v-model="page" :page-count="5" :total="data?.length"/>
          </div>
        </template>
        <BlogEmpty v-else/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {data} = await useAsyncData(
    'blog',
    () => queryContent('/blogs')
        .where({published: true})
        .sort({_id: 1})
        .find()
);
const page = ref(1);
</script>

<style scoped>

</style>