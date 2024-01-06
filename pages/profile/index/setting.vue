<template>
  <UForm :state="state" class="space-y-4" @submit="handleSubmit">
    <UFormGroup label="Avatar" name="image">
      <WidgetUploadAvatar v-model="state.image" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" disabled />
    </UFormGroup>
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Birthday" name="birthday">
      <DatePicker v-model="state.birthday" />
    </UFormGroup>
    <UFormGroup label="Phone number" name="phone">
      <UInput v-model="state.phone" />
    </UFormGroup>
    <UFormGroup label="Gender" name="gender">
      <URadioGroup v-model="state.gender" :options="genderOptions" />
    </UFormGroup>
    <UButton type="submit" :loading="isSubmitLoading" block>Submit</UButton>
  </UForm>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const toast = useToast();

const genderOptions = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

type State = {
  image: string;
  email: string;
  name: string;
  birthday: Date | null;
  phone: string;
  gender: string;
};

const state = ref<State>({
  image: '',
  email: '',
  name: '',
  birthday: null,
  phone: '',
  gender: '',
});

const isSubmitLoading = ref(false);
const handleSubmit = async () => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/profile/update', {
      method: 'PATCH',
      body: state.value,
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

const { data } = await useFetch('/api/profile/info');
watchEffect(() => {
  if (!data.value) return;
  state.value.image = data.value.image;
  state.value.email = data.value.email;
  state.value.birthday = dayjs(data.value.birthday).toDate();
  state.value.name = data.value.name;
  state.value.phone = data.value.phone;
  state.value.gender = data.value.gender;
});
</script>

<style scoped></style>
