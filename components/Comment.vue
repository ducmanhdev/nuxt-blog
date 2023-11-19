<template>
  <UCard id="post-comment">
    <template #header>
      <UTextarea v-model="value" placeholder="Leave your comment" />
      <div class="text-right mt-4">
        <UButton type="button" label="Send" />
      </div>
    </template>
    <template #default>
      <div class="divide-y">
        <CommmentItem
          v-for="comment in comments"
          :key="comment.id"
          :user="comment.user"
          :message="comment.message"
          :replies="comment.replies"
          class="py-4 first:pt-0 last:pb-0"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  postId: string;
}

defineProps<Props>();
const value = ref('');

const comments = ref([
  {
    id: '1',
    message:
      'Do you need a set of letters, symbols, numbers and special characters to create a random text string? With our String Generator you can generate a random string or a list up to 100 random text strings.',
    replies: [
      {
        id: '2',
        message: 'With our String Generator you can generate a random string or a list up to 100 random text strings.',
        replies: [],
        user: {
          id: '1',
          name: 'Nurriyad',
          avatar: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
        },
        createdAt: new Date(),
      },
      {
        id: '3',
        message: 'With our String Generator you can generate a random string or a list up to 100 random text strings.',
        replies: [],
        user: {
          id: '1',
          name: 'Nurriyad',
          avatar: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
        },
        createdAt: new Date(),
      },
    ],
    user: {
      id: '1',
      name: 'Nurriyad',
      avatar: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    message:
      'Do you need a set of letters, symbols, numbers and special characters to create a random text string? With our String Generator you can generate a random string or a list up to 100 random text strings.',
    replies: [],
    user: {
      id: '1',
      name: 'Nurriyad',
      avatar: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
    },
    createdAt: new Date(),
  },
  {
    id: '3',
    message:
      'Do you need a set of letters, symbols, numbers and special characters to create a random text string? With our String Generator you can generate a random string or a list up to 100 random text strings.',
    replies: [],
    user: {
      id: '1',
      name: 'Nurriyad',
      avatar: 'https://blog.nurriyad.xyz/_vercel/image?url=/blogs-img/blog4.webp&w=320&q=100',
    },
    createdAt: new Date(),
  },
]);
</script>

<style scoped></style>
