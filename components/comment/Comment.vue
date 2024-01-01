<template>
  <UCard id="post-comment">
    <template #header>
      <UForm :state="state" :schema="schema" :validate-on="['submit']" class="space-y-4" @submit="handleSubmit">
        <UFormGroup name="content">
          <UTextarea v-model="state.content" />
        </UFormGroup>
        <div class="text-right">
          <UButton type="submit" :loading="isSubmitLoading" icon="i-ion-paper-plane">Submit</UButton>
        </div>
      </UForm>
    </template>
    <template #default>
      <div v-if="getCommentsError" class="text-error text-center">Error: {{ getCommentsError?.message }}</div>
      <div v-else-if="comments?.length" class="divide-y child:py-4 child-first:pt-0 child-last:pb-0">
        <CommentItem
          v-for="comment in comments"
          :id="comment.id"
          :key="comment.id"
          :author="comment.author"
          :post-id="comment.postId"
          :content="comment.content"
          :replies="comment.replies"
          :created-at="comment.createdAt"
          :votes="comment.votes"
          :refresh-comments-fn="refreshComments"
        />
        <div class="text-center">
          <UButton variant="ghost" :loading="isLoadMoreLoading" block @click="handleLoadMoreComment">Read more</UButton>
        </div>
      </div>
      <div v-else class="text-center">No comments yet</div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { z } from 'zod';

const toast = useToast();

interface Props {
  postId: string;
}

const props = defineProps<Props>();
const DEFAULT_PER_PAGE = 10;
const perPage = ref(DEFAULT_PER_PAGE);
const {
  data: comments,
  refresh: refreshComments,
  error: getCommentsError,
} = await useLazyFetch('/api/comments', {
  query: {
    postId: props.postId,
    page: 1,
    limit: perPage,
  },
});

const state = ref({
  content: '',
});
const schema = z.object({
  content: z.string().min(1, 'Reply must have content!'),
});
type Schema = z.output<typeof schema>;
const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/comment/create', {
      method: 'POST',
      body: {
        content: event.data.content,
        postId: props.postId,
      },
    });
    state.value.content = '';
    refreshComments();
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isSubmitLoading.value = false;
  }
};

const isLoadMoreLoading = ref(false);
const handleLoadMoreComment = async () => {
  try {
    isLoadMoreLoading.value = true;
    perPage.value += DEFAULT_PER_PAGE;
    await refreshComments();
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isLoadMoreLoading.value = false;
  }
};
</script>

<style scoped></style>
