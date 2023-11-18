import { Post } from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await Post.findOne({
    slug: query?.slug,
  });
});
