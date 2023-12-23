import Post from '~/server/models/Post';
import APIFeatures from '~/utils/api-features';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const features = new APIFeatures(Post.find(), query).filter().sort().limitFields().paginate();
  const data = await features.query;
  const metadata = await features.meta();

  return {
    data,
    metadata,
  };
});
