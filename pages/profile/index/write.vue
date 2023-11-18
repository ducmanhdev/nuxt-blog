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
const state = ref({
  title: '',
  summary: '',
  content: '',
  tags: ['nuxt', 'nuxt-content'],
  thumbnail: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
});

const isSubmitLoading = ref(false);
const handleSubmit = async () => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(state.value),
    });
    toast.add({
      title: 'Create successfully',
      color: 'green',
    });
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
