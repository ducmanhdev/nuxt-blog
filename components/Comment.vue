<template>
  <UCard id="post-comment">
    <template #header>
      <UForm :state="state" class="space-y-4" @submit="handleSubmit">
        <UFormGroup name="content">
          <UTextarea v-model="state.content" />
        </UFormGroup>
        <div class="text-right">
          <UButton type="submit" :loading="isSubmitLoading">Post</UButton>
        </div>
      </UForm>
    </template>
    <template #default>
      <!--      <div class="divide-y">-->
      <!--        <CommentItem-->
      <!--          v-for="comment in comments"-->
      <!--          :key="comment.id"-->
      <!--          :user="comment.user"-->
      <!--          :message="comment.message"-->
      <!--          :replies="comment.replies"-->
      <!--          class="py-4 first:pt-0 last:pb-0"-->
      <!--        />-->
      <!--      </div>-->
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import { z } from 'zod';
interface Props {
  postId: string;
}

const props = defineProps<Props>();

const state = ref({
  content: '',
});

const schema = z.object({
  content: z.string().min(1),
});
type Schema = z.output<typeof schema>;

const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/review', {
      method: 'POST',
      body: {
        content: event.data.content,
        postId: props.postId,
      },
    });
  } catch (error) {
  } finally {
    isSubmitLoading.value = false;
  }
};
</script>

<style scoped></style>
