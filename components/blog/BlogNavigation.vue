<template>
  <div class="sticky top-24 flex flex-col items-center space-y-4">
    <div class="flex flex-col items-center gap-2 text-center">
      <UButton icon="i-mdi-chevron-up" color="gray" />
      <p class="font-semibold text-xl">12</p>
      <UButton icon="i-mdi-chevron-down" color="gray" />
    </div>
    <UButton
      :icon="isBookmark ? 'i-mdi-bookmark' : 'i-mdi-bookmark-outline'"
      :color="isBookmark ? 'primary' : 'gray'"
      square
      :ui="{ rounded: 'rounded-full' }"
      :loading="isBookmarkLoading"
      @click="handleToggleBookmark"
    />
    <UButton icon="i-mdi-chat-outline" color="gray" square :ui="{ rounded: 'rounded-full' }" />
    <UButton icon="i-mdi-share-outline" color="gray" square :ui="{ rounded: 'rounded-full' }" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  post: any;
}

const props = defineProps<Props>();

const isBookmark = ref(false);
const { data } = useAuth();
watch(
  () => props.post,
  (newPost) => {
    isBookmark.value = newPost?.bookmarkBy.includes(data.value?.user?._id);
  },
);

const isBookmarkLoading = ref(false);
const handleToggleBookmark = async () => {
  try {
    isBookmarkLoading.value = true;
    await $fetch('/api/bookmark', {
      method: 'POST',
      body: {
        post_id: props.post._id,
      },
    });
    isBookmark.value = !isBookmark.value;
  } catch (error: any) {
    useToast().add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isBookmarkLoading.value = false;
  }
};
</script>
