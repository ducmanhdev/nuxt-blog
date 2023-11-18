<template>
  <div class="sticky top-24 flex flex-col items-center space-y-4">
    <div class="flex flex-col items-center gap-2 text-center">
      <UButton icon="i-mdi-chevron-up" color="gray" />
      <p class="font-semibold text-xl">12</p>
      <UButton icon="i-mdi-chevron-down" color="gray" />
    </div>
    <UButton icon="i-mdi-bookmark" color="gray" square :ui="{ rounded: 'rounded-full' }" />
    <UButton icon="i-mdi-chat" color="gray" square :ui="{ rounded: 'rounded-full' }" />
    <UButton icon="i-mdi-share" color="gray" square :ui="{ rounded: 'rounded-full' }" />
  </div>
</template>

<script setup lang="ts"></script>
