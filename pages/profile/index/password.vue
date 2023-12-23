<template>
  <div>
    <UForm :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" />
      </UFormGroup>
      <UFormGroup label="NewPassword" name="newPassword">
        <UInput v-model="state.newPassword" />
      </UFormGroup>
      <UFormGroup label="Confirm new password" name="confirmNewPassword">
        <UInput v-model="state.confirmNewPassword" />
      </UFormGroup>
      <UButton type="submit" :loading="isSubmitLoading">Submit</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
const state = ref({
  password: '',
  newPassword: '',
  confirmNewPassword: '',
});

const isSubmitLoading = ref(false);
const handleSubmit = async () => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/profile/update', {
      method: 'PATCH',
      body: JSON.stringify(state.value),
    });
    toast.add({
      title: 'Update profile successfully',
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
