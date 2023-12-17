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
      <div v-if="comments?.length" class="divide-y">
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
          class="py-4 first:pt-0 last:pb-0"
          @refresh-comments="refreshComments"
        />
      </div>
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
const page = ref(1);
const {
  data: comments,
  pending,
  refresh: refreshComments,
  error,
} = useLazyFetch('/api/comments', {
  query: {
    postId: props.postId,
    page,
    perPage: 10,
  },
  watch: [page],
});

watchEffect(() => {
  console.log(comments.value);
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
    await $fetch('/api/comment', {
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
    });
  } finally {
    isSubmitLoading.value = false;
  }
};
</script>

<style scoped></style>
