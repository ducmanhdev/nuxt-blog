import { Post } from '~/server/models/Post';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return Post.findOne({
    slug: query?.slug,
  });
});
