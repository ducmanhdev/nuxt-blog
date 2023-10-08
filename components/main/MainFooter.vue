<template>
  <footer class="color-theme border-t">
    <div class="py-10">
      <div class="container">
        <div class="grid sm:grid-cols-3 gap-5">
          <div>
            <h2 class="text-2xl font-semibold mb-2">Just a blog site write with Nuxt 3</h2>
            <p>For learn Nuxt 3, i created this site, hope you enjoy it</p>
          </div>
          <div class="flex flex-col md:justify-self-center">
            <h3 class="text-lg font-semibold mb-2">Quick Link</h3>
            <nav>
              <ul>
                <li>
                  <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/blogs">Blogs</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/categories">Categories</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Connect With Me</h3>
            <nav class="text-2xl">
              <ul class="flex gap-2">
                <li v-for="item in listSocials" :key="item.icon">
                  <NuxtLink :to="item.link">
                    <UIcon :name="item.icon"/>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 border-t  text-center">
      <div class="container">
        <p>@Copyright by me 2023</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

const listSocials = [
  {
    icon: 'i-mdi-facebook',
    link: 'https://www.facebook.com/riyad.nur.5'
  },
  {
    icon: 'i-mdi-linkedin',
    link: 'https://www.facebook.com/riyad.nur.5'
  },
  {
    icon: 'i-mdi-github',
    link: 'https://www.facebook.com/riyad.nur.5'
  }
]
</script>

<style scoped>

</style>