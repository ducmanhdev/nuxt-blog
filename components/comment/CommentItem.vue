<template>
  <div class="space-y-2">
    <div class="flex items-center gap-4">
      <UAvatar size="lg" :src="user.avatar" />
      <div class="">
        <p class="font-semibold">{{ user.name }}</p>
        <p class="text-sm text-gray-500">{{ dayjs(createdAt).fromNow() }}</p>
      </div>
    </div>
    <div class="">{{ content }}</div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2 text-center">
        <UButton
          size="sm"
          icon="i-mdi-chevron-up"
          :color="currentVoteState === 1 ? 'primary' : 'gray'"
          @click="handleVote(1)"
        />
        <p class="font-semibold">{{ voteCount }}</p>
        <UButton
          size="sm"
          icon="i-mdi-chevron-down"
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
        :user="comment.user"
        :post-id="comment.post"
        :content="comment.content"
        :created-at="comment.createdAt"
        :votes="comment.votes"
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
  user: any;
  createdAt: string;
  isCanReply?: boolean;
  votes: any[];
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
    await $fetch('/api/reply-comment', {
      method: 'POST',
      body: {
        originalCommentId: props.id,
        postId: props.postId,
        content: event.data.content,
      },
    });
    state.value.content = '';
    isShowReplyForm.value = false;
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
const handleVote = async (value: 1 | -1) => {
  try {
    await $fetch('/api/vote-comment', {
      method: 'POST',
      body: {
        commentId: props.id,
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

<style scoped></style>
