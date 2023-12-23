<template>
  <UForm :state="state" class="space-y-4" @submit="handleSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Summary" name="summary">
      <UInput v-model="state.summary" />
    </UFormGroup>
    <UFormGroup label="Content" name="content">
      <TextEditor v-model="state.content" />
    </UFormGroup>
    <UButton type="submit" :loading="isSubmitLoading">Submit</UButton>
  </UForm>
</template>

<script setup lang="ts">
const toast = useToast();
const initialState = {
  title: '',
  summary: '',
  content: '',
  categories: ['nuxt', 'nuxt-content'],
  thumbnail: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
};
const state = ref({ ...initialState });

const isSubmitLoading = ref(false);
const handleSubmit = async () => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/post/create', {
      method: 'POST',
      body: JSON.stringify(state.value),
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
