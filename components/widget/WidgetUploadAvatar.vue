<template>
  <UChip
    size="md"
    position="top-right"
    inset
    :show="isShowDeleteImageBtn"
    :ui="{ base: '-mx-2 rounded-none ring-0', background: '' }"
  >
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white/10 grow flex items-center justify-center z-10"
      @click.stop.prevent
    >
      <UIcon name="i-mdi-loading" class="animate-spin text-4xl" />
    </div>
    <div class="w-auto cursor-pointer" @click="handleClick">
      <UAvatar
        size="4xl"
        :src="imageSrc"
        icon="i-mdi-account"
        :ui="{
          wrapper: 'base-input flex cursor-pointer p-0',
          rounded: 'rounded-md',
        }"
      />
    </div>
    <input ref="inputRef" type="file" class="hidden" :accept="acceptExtensions.join(',')" @change="handleUpload" />
    <template #content>
      <UTooltip text="Remove avatar">
        <UButton
          :ui="{ rounded: 'rounded-full' }"
          color="gray"
          icon="i-heroicons-x-mark-20-solid"
          size="xs"
          @click.prevent.stop="handleDelete"
        />
      </UTooltip>
    </template>
  </UChip>
</template>

<script setup lang="ts">
import { checkImageFileSize, objectToFormData } from '~/utils';

interface Props {
  modelValue: any;
  publicId?: string;
  maxSize?: number;
  acceptExtensions?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  publicId: '',
  maxSize: 0.5,
  acceptExtensions: () => ['.jpg', '.jpeg', '.png', '.svg', '.webp'],
});

interface Emits {
  (e: 'update:modelValue', newValue: any): void;
}

const emits = defineEmits<Emits>();

const imageSrc = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
  },
});
const isShowDeleteImageBtn = computed(() => Boolean(imageSrc.value));
const inputRef = ref<HTMLInputElement>();
const isLoading = ref(false);
const handleClick = () => inputRef.value?.click();
const handleUpload = async (event: any) => {
  try {
    const file = event.target.files[0];
    if (!file) return;
    checkImageFileSize(file, props.maxSize);
    isLoading.value = true;
    const response: any = await $fetch('/api/upload-image', {
      method: 'POST',
      body: objectToFormData({
        file,
      }),
    });
    imageSrc.value = response.url;
  } catch (error: any) {
    useToast().add({
      title: error.message,
      color: 'red',
    });
  } finally {
    isLoading.value = false;
  }
};
const handleDelete = () => {
  imageSrc.value = null;
};
</script>

<style scoped></style>
