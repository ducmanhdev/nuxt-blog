<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Login</h1>
      <UForm :schema="schema" :state="state" class="space-y-4 max-w-md mx-auto" @submit="handleSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <div class="text-center">
          <UButton type="submit" block :loading="isSubmitLoading">Login</UButton>
        </div>
        <div class="flex justify-between gap-4">
          <p>
            Don't have an account?
            <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
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

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const { signIn } = useAuth();
const toast = useToast();

const state = ref({
  email: 'work.ducmanh0323@gmail.com',
  password: '87654321',
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(REQUIRED_PASSWORD_LENGTH, `Must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
});

type Schema = z.output<typeof schema>;

const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    const { error, url }: any = await signIn('credentials', {
      email: event.data.email,
      password: event.data.password,
      redirect: false,
      callbackUrl: '/',
    });
    if (error) throw new Error(error);
    navigateTo(url, { external: true });
    toast.add({
      title: 'Login successfully',
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
