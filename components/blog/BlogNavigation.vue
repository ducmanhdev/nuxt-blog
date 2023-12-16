<template>
  <div class="sticky top-24 flex flex-col items-center space-y-4">
    <div class="flex flex-col items-center gap-2 text-center">
      <UButton icon="i-mdi-chevron-up" :color="currentVoteState === 1 ? 'primary' : 'gray'" @click="handleVote(1)" />
      <p class="font-semibold text-xl">{{ voteCount }}</p>
      <UButton
        icon="i-mdi-chevron-down"
        :color="currentVoteState === -1 ? 'primary' : 'gray'"
        @click="handleVote(-1)"
      />
    </div>
    <UButton
      :icon="isBookmark ? 'i-mdi-bookmark' : 'i-mdi-bookmark-outline'"
      :color="isBookmark ? 'primary' : 'gray'"
      square
      :ui="{ rounded: 'rounded-full' }"
      :loading="isBookmarkLoading"
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

const isBookmark = ref(false);
const { data } = useAuth();
const userId = computed(() => (data.value?.user as any)?._id);

watch(
  () => props.post,
  (newPost) => {
    isBookmark.value = newPost?.bookmarkBy.includes(userId.value);
  },
  {
    immediate: true,
  },
);

const isBookmarkLoading = ref(false);
const handleToggleBookmark = async () => {
  try {
    isBookmarkLoading.value = true;
    await $fetch('/api/bookmark', {
      method: 'POST',
      body: {
        post_id: props.post.id,
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

const currentVoteState = computed(() => props.post.votes.find((vote: any) => vote.userId === userId.value)?.value);
const voteCount = computed(() =>
  props.post.votes.map((vote: any) => vote.value).reduce((total: number, current: number) => total + current, 0),
);
const handleVote = async (value: 1 | -1) => {
  try {
    await $fetch('/api/vote-post', {
      method: 'POST',
      body: {
        postId: props.post.id,
        value,
      },
    });
  } catch (error: any) {
    toast.add({
      title: error.message,
    });
  }
};
</script>
