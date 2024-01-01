<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Forget password</h1>
      <UForm :schema="schema" :state="state" class="space-y-4 max-w-md mx-auto" @submit="handleSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <div class="text-center">
          <UButton type="submit" block :loading="isSubmitLoading">Send email</UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { z } from 'zod';

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const toast = useToast();

const state = ref({
  email: undefined,
});

const schema = z.object({
  email: z.string().email('Invalid email'),
});

type Schema = z.output<typeof schema>;

const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/auth/forget-password', {
      method: 'POST',
      body: {
        email: event.data.email,
      },
    });
    toast.add({
      title: 'An email has been sent to your provided email address. Please check your inbox.',
      color: 'green',
      timeout: 0,
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
