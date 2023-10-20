<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Register</h1>
      <UForm :schema="schema" :state="state" @submit="handleSubmit" class="space-y-4 max-w-md mx-auto">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UFormGroup label="Confirm password" name="confirmPassword">
          <UInput v-model="state.confirmPassword" type="password" />
        </UFormGroup>
        <div class="text-center space-y-4">
          <UButton type="submit" block :loading="isSubmitLoading"> Register</UButton>
          <p>
            Have an account?
            <NuxtLink to="/login" class="text-primary">Login</NuxtLink>
          </p>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { z } from 'zod';

definePageMeta({
  middleware: [
    () => {
      const user = useSupabaseUser();
      if (user.value) {
        return navigateTo('/');
      }
    },
  ],
});

const toast = useToast();

const state = ref({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const schema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Schema = z.output<typeof schema>;

const supabase = useSupabaseClient();
const isSubmitLoading = ref(false);

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitLoading.value = true;
    const { error } = await supabase.auth.signUp({
      email: event.data.email,
      password: event.data.password,
    });
    if (error) throw error;
    toast.add({
      title: 'Register success!',
    });
    navigateTo('/login');
  } catch (error: any) {
    toast.add({
      title: error.error_description || error.message,
    });
  } finally {
    isSubmitLoading.value = false;
  }
}
</script>

<style scoped></style>