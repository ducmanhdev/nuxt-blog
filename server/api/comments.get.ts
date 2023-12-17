import Comment from '~/server/models/Comment';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return Comment.find({
    postId: query.postId,
    isReply: false,
  }).sort({ createdAt: -1 });
});
