import Review from '~/server/models/Review';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return Review.findById(query.reviewId);
});
