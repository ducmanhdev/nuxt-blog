<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Forget password</h1>
      <UForm :schema="schema" :state="state" class="space-y-4 max-w-md mx-auto" @submit="handleSubmit">
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UFormGroup label="Password Confirm" name="passwordConfirm">
          <UInput v-model="state.passwordConfirm" type="password" />
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
import { REQUIRED_PASSWORD_LENGTH } from '~/constants';

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const toast = useToast();
const route = useRoute();

const state = ref({
  password: '',
  passwordConfirm: '',
});

const schema = z
  .object({
    password: z.string().min(REQUIRED_PASSWORD_LENGTH, `Must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
    passwordConfirm: z
      .string()
      .min(REQUIRED_PASSWORD_LENGTH, `Must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

type Schema = z.output<typeof schema>;

const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    const { success } = await $fetch('/api/auth/reset-password', {
      method: 'PATCH',
      body: {
        token: route.query.token,
        password: event.data.password,
        passwordConfirm: event.data.passwordConfirm,
      },
    });
    toast.add({
      title: success,
      color: 'green',
    });
    navigateTo('/login');
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
