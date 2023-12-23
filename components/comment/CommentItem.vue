<template>
  <div class="space-y-2">
    <div class="flex items-center gap-4">
      <UAvatar size="lg" :src="author.avatar" />
      <div class="">
        <p class="font-semibold">{{ author.name }}</p>
        <p class="text-sm text-gray-500">{{ dayjs(createdAt).fromNow() }}</p>
      </div>
    </div>
    <div class="">{{ content }}</div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2 text-center">
        <UButton
          size="sm"
          icon="i-mdi-chevron-up"
          :loading="isVoteLoadingValue === 1"
          :color="currentVoteState === 1 ? 'primary' : 'gray'"
          @click="handleVote(1)"
        />
        <p class="font-semibold min-w-[16px] text-center">{{ voteCount }}</p>
        <UButton
          size="sm"
          icon="i-mdi-chevron-down"
          :loading="isVoteLoadingValue === -1"
          :color="currentVoteState === -1 ? 'primary' : 'gray'"
          @click="handleVote(-1)"
        />
      </div>
      <UButton
        v-if="isCanReply"
        type="button"
        variant="link"
        :label="isShowReplyForm ? 'Cancel' : 'Reply'"
        @click="handleShowReplyComment"
      />
    </div>
    <div v-if="isShowReplyForm">
      <UForm
        :state="state"
        :schema="schema"
        :validate-on="['submit']"
        class="grid grid-cols-[1fr_auto] gap-4"
        @submit="handleSubmit"
      >
        <UFormGroup name="content">
          <UTextarea v-model="state.content" :rows="2" />
        </UFormGroup>
        <UButton type="submit" :loading="isSubmitLoading" icon="i-ion-paper-plane" />
      </UForm>
    </div>
    <div v-if="replies?.length" class="space-y-4 !mt-4 pl-10">
      <CommentItem
        v-for="comment in replies"
        :id="comment.id"
        :key="comment.id"
        :author="comment.author"
        :post-id="comment.postId"
        :content="comment.content"
        :created-at="comment.createdAt"
        :votes="comment.votes"
        :refresh-comments-fn="props.refreshCommentsFn"
        :is-can-reply="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

dayjs.extend(RelativeTime);

interface Props {
  id: string;
  postId: string;
  content: string;
  replies?: Props[];
  author: any;
  createdAt: string;
  isCanReply?: boolean;
  votes: any[];
  refreshCommentsFn: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  replies: () => [],
  isCanReply: true,
});

const isShowReplyForm = ref(false);
const handleShowReplyComment = () => {
  isShowReplyForm.value = !isShowReplyForm.value;
};

const state = ref({
  content: '',
});

const schema = z.object({
  content: z.string().min(1),
});
type Schema = z.output<typeof schema>;

const toast = useToast();
const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/comment/reply', {
      method: 'POST',
      body: {
        originalCommentId: props.id,
        postId: props.postId,
        content: event.data.content,
      },
    });
    state.value.content = '';
    isShowReplyForm.value = false;
    props.refreshCommentsFn();
  } catch (error: any) {
    toast.add({
      title: error.message,
    });
  } finally {
    isSubmitLoading.value = false;
  }
};

const { data } = useAuth();
const currentVoteState = computed(() => props.votes.find((vote: any) => vote.userId === data.value?.user?._id)?.value);
const voteCount = computed(() =>
  props.votes.map((vote: any) => vote.value).reduce((total, current) => total + current, 0),
);

const isVoteLoadingValue = ref<false | 1 | -1>(false);
const handleVote = async (value: 1 | -1) => {
  try {
    isVoteLoadingValue.value = value;
    await $fetch('/api/comment/vote', {
      method: 'POST',
      body: {
        commentId: props.id,
        value,
      },
    });
    props.refreshCommentsFn();
  } catch (error: any) {
    toast.add({
      title: error.message,
    });
  } finally {
    isVoteLoadingValue.value = false;
  }
};
</script>

<style scoped></style>
