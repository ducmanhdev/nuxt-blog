<template>
  <div
    class="min-h-[200px] flex flex-col overflow-hidden cursor-pointer relative group disabled:cursor-not-allowed disabled:opacity-75 border-0 focus:outline-none rounded-md placeholder-gray-400 dark:placeholder-gray-500 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    @dragover.prevent
    @drop.prevent="handleDrop"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white/10 grow flex items-center justify-center z-10"
      @click.stop.prevent
    >
      <UIcon name="i-mdi-loading" class="animate-spin text-4xl" />
    </div>
    <template v-if="imageSrc">
      <img :src="imageSrc" alt="" class="w-full h-full block object-cover" />
      <div
        class="absolute inset-0 group-hover:bg-white/10 transition flex justify-center items-center gap-2 pointer-events-none"
      >
        <UButton
          icon="i-mdi-trash"
          label="Delete"
          color="red"
          class="pointer-events-auto"
          @click.stop.prevent="handleDelete"
        />
        <UButton icon="i-mdi-edit" label="Change" class="pointer-events-auto" />
      </div>
    </template>
    <div
      v-else
      class="grow flex flex-col items-center justify-center text-center p-10 text-gray-500 dark:text-gray-400"
    >
      <UIcon name="i-mdi-cloud-upload-outline" class="text-4xl" />
      <p class="block mb-2 text-sm"><span class="font-semibold">Click to upload</span> or drag and drop</p>
      <p class="block text-xs">{{ acceptExtensionsDescription }} (MAX. {{ maxSize }}MB)</p>
    </div>
    <input ref="inputRef" type="file" class="hidden" :accept="acceptExtensions.join(',')" @change="handleUpload" />
  </div>
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

const acceptExtensionsDescription = computed(() => {
  return props.acceptExtensions
    .join(', ')
    .toUpperCase()
    .replace(/,\s([^,]*)$/, ' or $1');
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

const inputRef = ref<HTMLInputElement>();
const isLoading = ref(false);
const handleClick = () => inputRef.value?.click();
const handleDrop = (event: any) => {
  if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...event.dataTransfer.items].forEach((item) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
        console.log(file);
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...event.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
};
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
