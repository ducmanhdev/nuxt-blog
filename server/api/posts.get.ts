import { Post } from '~/server/models/Post';

export default defineEventHandler(async () => {
  return await Post.find();
});
