<template>
  <div class="sticky top-24 flex flex-col items-center space-y-4">
    <div class="flex flex-col items-center gap-2 text-center">
      <UButton
        icon="i-mdi-chevron-up"
        :color="voteInfo?.voteValue === 1 ? 'primary' : 'gray'"
        :loading="isVoteLoadingValue === 1"
        @click="handleVote(1)"
      />
      <p class="font-semibold text-xl">{{ voteInfo?.voteCount }}</p>
      <UButton
        icon="i-mdi-chevron-down"
        :color="voteInfo?.voteValue === -1 ? 'primary' : 'gray'"
        :loading="isVoteLoadingValue === -1"
        @click="handleVote(-1)"
      />
    </div>
    <UButton
      :icon="isBookmark ? 'i-mdi-bookmark' : 'i-mdi-bookmark-outline'"
      :color="isBookmark ? 'primary' : 'gray'"
      square
      :ui="{ rounded: 'rounded-full' }"
      :loading="isBookmarkLoading || getBookmarkStatusPending"
      @click="handleToggleBookmark"
    />
    <UButton
      icon="i-mdi-chat-outline"
      color="gray"
      square
      :ui="{ rounded: 'rounded-full' }"
      @click.prevent="handleScrollToEl('#post-comment')"
    />
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

interface Props {
  post: any;
}

const props = defineProps<Props>();

const {
  data: isBookmark,
  pending: getBookmarkStatusPending,
  refresh: refreshBookmarkStatus,
} = await useLazyFetch('/api/bookmark-status', {
  query: {
    postId: props.post.id,
  },
  watch: [() => props.post.id],
});

const isBookmarkLoading = ref(false);
const handleToggleBookmark = async () => {
  try {
    isBookmarkLoading.value = true;
    await $fetch('/api/bookmark', {
      method: 'POST',
      body: {
        postId: props.post.id,
      },
    });
    refreshBookmarkStatus();
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isBookmarkLoading.value = false;
  }
};

const { data: voteInfo, refresh: refreshVoteInfo } = useLazyFetch('/api/vote-post-info', {
  query: {
    postId: props.post.id,
  },
  watch: [() => props.post.id],
});

const isVoteLoadingValue = ref<false | 1 | -1>(false);
const handleVote = async (value: 1 | -1) => {
  try {
    isVoteLoadingValue.value = value;
    await $fetch('/api/vote-post', {
      method: 'POST',
      body: {
        postId: props.post.id,
        value,
      },
    });
    refreshVoteInfo();
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'error',
    });
  } finally {
    isVoteLoadingValue.value = false;
  }
};
</script>
