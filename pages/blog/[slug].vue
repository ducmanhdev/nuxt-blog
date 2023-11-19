<template>
  <div class="py-10">
    <div class="container">
      <div class="lg:grid lg:grid-cols-[100px_1fr_100px] lg:gap-10 mb-6">
        <aside>
          <BlogNavigation :post="data" />
        </aside>
        <div>
          <BlogHero
            :title="data?.title"
            :created-at="data?.createdAt"
            :summary="data?.summary"
            :thumbnail="data?.thumbnail"
            :thumbnail-alt="data?.title"
            :tags="data?.tags"
          />
          <article class="content" v-html="data?.content"></article>
        </div>
      </div>
      <Comment :post-id="data._id" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data } = await useFetch('/api/post', {
  params: {
    slug: route.params.slug,
  },
});
</script>
