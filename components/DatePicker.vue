<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UInput :value="dateFormatted" icon="i-mdi-calendar" class="w-full" readonly />
    <template #panel="{ close }">
      <LazyDatePickerPanel v-model="date" @close="close" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Props {
  modelValue?: Date;
  format?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => new Date(),
  format: DATE_FORMAT,
});

interface Emits {
  (e: 'update:modelValue', value: any): void;
}

const emit = defineEmits<Emits>();

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
});
const dateFormatted = computed(() => dayjs(date.value).format(DATE_FORMAT));
</script>
