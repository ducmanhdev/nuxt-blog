<template>
  <div class="space-y-2">
    <div class="flex items-center gap-4">
      <UAvatar size="lg" :src="user.avatar" />
      <div class="">
        <p class="font-semibold">{{ user.name }}</p>
        <p class="text-sm text-gray-500">1 hour ago</p>
      </div>
    </div>
    <div class="">{{ message }}</div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2 text-center">
        <UButton size="sm" icon="i-mdi-chevron-up" color="gray" />
        <p class="font-semibold">12</p>
        <UButton size="sm" icon="i-mdi-chevron-down" color="gray" />
      </div>
      <UButton type="button" variant="link" label="Answer" />
    </div>
    <div v-if="replies?.length" class="space-y-4 mt-4 pl-10">
      <CommmentItem
        v-for="reply in replies"
        :key="reply.id"
        :message="reply.message"
        :user="reply.user"
        :is-can-reply="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
  replies?: any[];
  user: any;
  isCanReply?: boolean;
}

withDefaults(defineProps<Props>(), {
  isCanReply: true,
  replies: () => [],
});
</script>

<style scoped></style>
