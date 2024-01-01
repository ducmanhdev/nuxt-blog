<template>
  <div class="sticky top-24 flex flex-col items-center space-y-4">
    <div class="flex flex-col items-center gap-2 text-center">
      <UButton
        icon="i-mdi-chevron-up"
        :color="voteInfo?.userVoteValue === 1 ? 'primary' : 'gray'"
        :loading="isVoteLoadingValue === 1"
        @click="handleVote(1)"
      />
      <p class="font-semibold text-xl">{{ voteInfo?.totalValue || 0 }}</p>
      <UButton
        icon="i-mdi-chevron-down"
        :color="voteInfo?.userVoteValue === -1 ? 'primary' : 'gray'"
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
  postId: any;
}

const props = defineProps<Props>();

const {
  data: isBookmark,
  pending: getBookmarkStatusPending,
  refresh: refreshBookmarkStatus,
} = await useLazyFetch('/api/post/is-bookmarked', {
  query: {
    postId: props.postId,
  },
  watch: [() => props.postId],
});

const isBookmarkLoading = ref(false);
const handleToggleBookmark = async () => {
  try {
    isBookmarkLoading.value = true;
    await $fetch('/api/post/bookmark', {
      method: 'POST',
      body: {
        postId: props.postId,
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

const { data: voteInfo, refresh: refreshVoteInfo } = useLazyFetch('/api/post/get-votes-statistical', {
  query: {
    postId: props.postId,
  },
  watch: [() => props.postId],
});

const isVoteLoadingValue = ref<false | 1 | -1>(false);
const handleVote = async (value: 1 | -1) => {
  try {
    isVoteLoadingValue.value = value;
    await $fetch('/api/post/vote', {
      method: 'POST',
      body: {
        postId: props.postId,
        value,
      },
    });
    refreshVoteInfo();
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isVoteLoadingValue.value = false;
  }
};
</script>
