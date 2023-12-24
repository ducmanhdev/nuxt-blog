<template>
  <VCalendarDatePicker
    v-model="date"
    transparent
    borderless
    :attributes="attrs"
    :is-dark="isDark"
    title-position="left"
    trim-weeks
    :first-day-of-week="2"
  />
</template>

<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar';
import 'v-calendar/style.css';

interface Props {
  modelValue?: Date;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:modelValue', value: any): void;

  (e: 'close'): void;
}

const emit = defineEmits<Emits>();

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('close');
  },
});

const attrs = [
  {
    key: 'today',
    highlight: {
      color: 'blue',
      fillMode: 'outline',
      class: '!bg-gray-100 dark:!bg-gray-800',
    },
    dates: new Date(),
  },
];
</script>
