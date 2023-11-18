<template>
  <div class="py-10">
    <div class="container">
      <div class="lg:grid lg:grid-cols-[100px_1fr_100px] lg:gap-10">
        <aside>
          <BlogNavigation />
        </aside>
        <div>
          <BlogHero
            :title="data.title"
            :created-at="data.createdAt"
            :summary="data.summary"
            :thumbnail="data.thumbnail"
            :thumbnail-alt="data.title"
            :tags="data.tags"
          />
          <article class="content" v-html="data.content"></article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data } = useFetch('/api/post', {
  params: {
    slug: route.params.slug,
  },
});
</script>
