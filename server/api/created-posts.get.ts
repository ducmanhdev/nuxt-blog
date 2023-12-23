import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';
import APIFeatures from '~/utils/api-features';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const query = getQuery(event);

  const features = new APIFeatures(
    Post.find({
      author: user._id,
    }),
    query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;
  const metadata = await features.meta();
  return {
    data,
    metadata,
  };
});
