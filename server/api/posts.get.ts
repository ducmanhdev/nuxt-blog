import { Post } from '~/server/models/Post';
import APIFeatures from '~/utils/api-features';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return new APIFeatures(Post.find(), query).filter().sort().limitFields().paginate();
});
