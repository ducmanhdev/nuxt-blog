<template>
  <div class="min-h-screen flex flex-col">
    <MainHeader class="shrink-0"/>
    <main class="grow">
      <slot></slot>
    </main>
    <MainFooter class="shrink-0"/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>