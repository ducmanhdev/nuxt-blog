import Comment from '~/server/models/Comment';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return Comment.findById(query.commentId);
});
