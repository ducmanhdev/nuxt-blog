<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Register</h1>
      <UForm :schema="schema" :state="state" class="space-y-4 max-w-md mx-auto" @submit="handleSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UFormGroup label="Password confirm" name="passwordConfirm">
          <UInput v-model="state.passwordConfirm" type="password" />
        </UFormGroup>
        <div class="text-center">
          <UButton type="submit" block :loading="isSubmitLoading">Register</UButton>
        </div>
        <div class="flex justify-between gap-4">
          <p>
            Have an account?
            <NuxtLink to="/login" class="text-primary">Login</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/forget-password" class="text-primary">Forget password?</NuxtLink>
          </p>
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

const state = ref({
  email: '',
  password: '',
  passwordConfirm: '',
});

const schema = z
  .object({
    email: z.string().email('Invalid email'),
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
    const { success } = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: event.data.email,
        password: event.data.password,
        passwordConfirm: event.data.passwordConfirm,
      },
    });
    toast.add({
      title: success,
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
