import Comment from '~/server/models/Comment';
import APIFeatures from '~/utils/api-features';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const features = new APIFeatures(
    Comment.find({
      originalCommentId: { $exists: false },
    }),
    query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return features.query;
});
