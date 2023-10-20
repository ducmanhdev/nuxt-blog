<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Login</h1>
      <UForm :schema="schema" :state="state" @submit="handleSubmit" class="space-y-4 max-w-md mx-auto">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <div class="text-center space-y-4">
          <UButton type="submit" block :loading="isSubmitLoading"> Login</UButton>
          <p>
            Don't have an account?
            <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
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
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

const supabase = useSupabaseClient();
const isSubmitLoading = ref(false);

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password,
    });
    if (error) throw error;
    toast.add({
      title: 'Login success!',
    });
    navigateTo('/');
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