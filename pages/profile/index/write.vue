<template>
  <UForm :state="state" :schema="schema" class="space-y-4" @submit="handleSubmit">
    <UFormGroup label="Thumbnail" name="thumbnail">
      <WidgetUpload v-model="state.thumbnail" />
    </UFormGroup>
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Summary" name="summary">
      <UInput v-model="state.summary" />
    </UFormGroup>
    <UFormGroup label="Categories" name="categories">
      <div v-if="state.categories?.length" class="mb-4 flex flex-wrap gap-2">
        <UButton
          v-for="category in state.categories"
          :key="category"
          color="primary"
          variant="solid"
          @click="handleDeleteCategory(category)"
        >
          {{ category }}
          <template #trailing>
            <UIcon name="i-mdi-close-circle-outline" />
          </template>
        </UButton>
      </div>
      <USelectMenu
        v-model="state.categories"
        :options="BLOG_CATEGORIES"
        multiple
        searchable
        searchable-placeholder="Search a category..."
        placeholder="Select categories"
      />
    </UFormGroup>
    <UFormGroup label="Content" name="content">
      <Editor v-model="state.content" :api-key="(runtimeConfig.public as any).tinymceApiKey" :init="editorOptions" />
    </UFormGroup>
    <UButton type="submit" :loading="isSubmitLoading" block>Submit</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import Editor from '@tinymce/tinymce-vue';
import { objectToFormData } from '~/utils';

const runtimeConfig = useRuntimeConfig();
const toast = useToast();
const colorMode = useColorMode();

const editorOptions = computed(() => ({
  plugins: 'image code advlist autolink link image lists preview emoticons',
  toolbar: [
    'undo redo | bold italic strikethrough forecolor backcolor removeformat | link image | alignleft aligncenter alignright alignjustify',
    'numlist bullist indent | emoticons preview',
  ],
  images_upload_handler: async function (blobInfo: any) {
    const response: any = await $fetch('/api/upload-image', {
      method: 'POST',
      body: objectToFormData({
        file: blobInfo.blob(),
      }),
    });
    return response.url;
  },
  skin: colorMode.value === 'dark' ? 'oxide-dark' : 'oxide',
  content_css: colorMode.value === 'dark' ? 'dark' : 'default',
  content_style: 'content',
}));

const handleDeleteCategory = (removeCategory: string) => {
  state.value.categories = state.value.categories.filter((category) => category !== removeCategory);
};
const initialState = {
  title: '',
  summary: '',
  content: '',
  categories: [],
  thumbnail: '',
};
const state = ref({ ...initialState });
const schema = z.object({
  title: z.string().min(0, { message: 'Title is required' }),
  summary: z.string().min(0, { message: 'Summary is required' }),
  content: z.string().min(0, { message: 'Content is required' }),
  categories: z.array(z.string()).min(0, { message: 'At least one category is required' }),
  thumbnail: z.string().url({ message: 'Invalid URL' }),
});
type Schema = z.output<typeof schema>;
const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/post/create', {
      method: 'POST',
      body: event.data,
    });
    toast.add({
      title: 'Create successfully',
      color: 'green',
    });
    state.value = {
      ...initialState,
    };
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isSubmitLoading.value = false;
  }
};
</script>

<style scoped></style>
