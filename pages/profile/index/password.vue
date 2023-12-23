<template>
  <div>
    <UForm :state="state" :schema="schema" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Old password" name="oldPassword">
        <UInput v-model="state.oldPassword" type="password" />
      </UFormGroup>
      <UFormGroup label="NewPassword" name="newPassword">
        <UInput v-model="state.newPassword" type="password" />
      </UFormGroup>
      <UFormGroup label="Confirm new password" name="confirmNewPassword">
        <UInput v-model="state.confirmNewPassword" type="password" />
      </UFormGroup>
      <UButton type="submit" :loading="isSubmitLoading">Submit</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const toast = useToast();

const schema = z
  .object({
    oldPassword: z.string().min(REQUIRED_PASSWORD_LENGTH, `Must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
    newPassword: z.string().min(REQUIRED_PASSWORD_LENGTH, `Must be at least ${REQUIRED_PASSWORD_LENGTH} characters`),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password can't be the same as the current password",
    path: ['newPassword'],
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: 'Confirm password does not match new password',
    path: ['confirmNewPassword'],
  });
type Schema = z.output<typeof schema>;

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
const state = ref({ ...initialState });

const isSubmitLoading = ref(false);
const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/profile/update-password', {
      method: 'PATCH',
      body: event.data,
    });
    toast.add({
      title: 'Update password successfully',
      color: 'green',
    });
    state.value = { ...initialState };
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
