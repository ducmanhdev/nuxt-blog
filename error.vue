<template>
  <div>
    <div class="min-h-screen flex items-center text-center">
      <div class="container">
        <h2 class="text-8xl font-bold mb-2">{{ error.statusCode }}</h2>
        <h1 class="text-4xl font-medium mb-4">{{ error.statusMessage || error.message }}</h1>
        <UButton icon="i-mdi-chevron-left" @click="handleError">Back to home</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: {
    statusCode: number;
    statusMessage: string;
    message: string;
  };
}

defineProps<Props>();

const handleError = () => clearError({ redirect: '/' });
</script>
