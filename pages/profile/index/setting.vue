<template>
  <div>
    <UForm :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" disabled />
      </UFormGroup>
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Birthday" name="birthday">
        <UInput v-model="state.birthday" />
      </UFormGroup>
      <UFormGroup label="Phone number" name="phone">
        <UInput v-model="state.phone" />
      </UFormGroup>
      <UButton type="submit" :loading="isSubmitLoading">Submit</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
const state = ref({
  email: '',
  name: '',
  birthday: '',
  phone: '',
});

const isSubmitLoading = ref(false);
const handleSubmit = async () => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/profile', {
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

const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data } = await useFetch('/api/profile', { headers });
watchEffect(() => {
  if (!data.value) return;
  state.value.email = data.value.email;
  state.value.birthday = data.value.birthday;
  state.value.name = data.value.name;
  state.value.phone = data.value.phone;
});
</script>

<style scoped></style>
