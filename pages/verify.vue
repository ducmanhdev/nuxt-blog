<template>
  <div class="py-10">
    <div class="container">
      <h1 class="section-title text-center">Verification</h1>
      <div class="max-w-md mx-auto">
        <UAlert v-if="pending" variant="subtle" title="Loading..." class="text-center" />
        <UAlert
          v-else-if="error"
          color="error"
          variant="subtle"
          title="Error"
          :description="error.message"
          class="text-center"
        />
        <UAlert
          v-else
          color="primary"
          variant="subtle"
          title="Success"
          :description="data?.success"
          class="text-center"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const route = useRoute();
const { data, pending, error } = await useLazyFetch('/api/auth/verify', {
  method: 'POST',
  body: {
    token: route.query.token,
  },
  server: false,
});
</script>

<style scoped></style>
