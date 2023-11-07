<template>
  <div class="py-10">
    <div class="container">
      <div v-if="data" class="lg:grid lg:grid-cols-[1fr_auto] lg:gap-10">
        <!--        <aside class="shrink-0">-->
        <!--          <BlogNavigation/>-->
        <!--        </aside>-->
        <div></div>
        <aside class="w-[240px] hidden lg:block"></aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { path } = useRoute();

const { data, error } = await useFetch('/api/post', {
  query: {
    id: 1,
  },
});

if (error.value) {
  navigateTo('/404');
}

useHead({
  title: data.value?.title || '',
  meta: [
    {
      name: 'description',
      content: data.value?.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    {
      property: 'og:site_name',
      content: "Riyad's Blog",
    },
    {
      key: 'og:type',
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `https://blog-nurriyad.vercel.app/${path}`,
    },
    {
      property: 'og:title',
      content: data.value?.title,
    },
    {
      property: 'og:description',
      content: data.value?.description,
    },
    {
      property: 'og:image',
      content: data.value?.ogImage || data.value?.image,
    },

    // // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    // {name: 'twitter:site', content: '@qdnvubp'},
    // {name: 'twitter:card', content: 'summary_large_image'},
    // {
    //   name: 'twitter:url',
    //   content: `https://blog-nurriyad.vercel.app/${path}`,
    // },
    // {
    //   name: 'twitter:title',
    //   content: data.value?.title,
    // },
    // {
    //   name: 'twitter:description',
    //   content: data.value?.description,
    // },
    // {
    //   name: 'twitter:image',
    //   content: data.value?.ogImage || data.value?.image,
    // },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://blog-nurriyad.vercel.app/${path}`,
    },
  ],
});

defineOgImage({
  title: data.value?.title,
  description: data.value?.description,
});
</script>
