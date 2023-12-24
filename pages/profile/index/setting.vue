<template>
  <UForm :state="state" class="space-y-4" @submit="handleSubmit">
    <UFormGroup label="Avatar" name="avatar">
      <label class="inline-block cursor-pointer">
        <UAvatar :src="state.avatar" size="3xl" alt="Avatar" />
        <UInput type="file" class="hidden" accept="image/*" @change="handleUploadAvatar" />
      </label>
    </UFormGroup>
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
    <UFormGroup label="Gender" name="gender">
      <URadioGroup v-model="state.gender" :options="genderOptions" />
    </UFormGroup>
    <UButton type="submit" :loading="isSubmitLoading">Submit</UButton>
  </UForm>
</template>

<script setup lang="ts">
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

const state = ref({
  avatar: '',
  email: '',
  name: '',
  birthday: '',
  phone: '',
  gender: '',
});

const avatarUploadFile = ref();
const handleUploadAvatar = (event: any) => {
  const imageFile = event.target.files[0];
  if (!imageFile) return;
  state.value.avatar = URL.createObjectURL(imageFile);
  avatarUploadFile.value = imageFile;
};

const isSubmitLoading = ref(false);
const handleSubmit = async () => {
  try {
    isSubmitLoading.value = true;
    await $fetch('/api/profile/update', {
      method: 'PATCH',
      body: objectToFormData({
        ...state.value,
        avatarUploadFile: avatarUploadFile.value,
      }),
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
  state.value.avatar = data.value.avatar;
  state.value.email = data.value.email;
  state.value.birthday = data.value.birthday;
  state.value.name = data.value.name;
  state.value.phone = data.value.phone;
  state.value.gender = data.value.gender;
});
</script>

<style scoped></style>
