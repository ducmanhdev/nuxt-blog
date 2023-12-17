import Comment from '~/server/models/Comment';
import APIFeatures from '~/utils/api-features';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const features = new APIFeatures(Comment.find(), {
    ...query,
    isReply: false,
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return features.query;
});
