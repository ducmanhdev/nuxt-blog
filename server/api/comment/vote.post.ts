import Comment from '~/server/models/Comment';
import CommentVote from '~/server/models/CommentVote';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { commentId, value } = await readBody(event);

  if (![1, -1].includes(value)) {
    throw createError({
      statusMessage: 'Vote value must be 1 (up vote) or -1 (down vote).',
      statusCode: 400,
    });
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw createError({
      statusMessage: 'Comment not found.',
      statusCode: 404,
    });
  }

  const existingVote = await CommentVote.findOne({
    userId: user._id,
    commentId: commentId,
  });
  if (!existingVote) {
    const newVote = new CommentVote({
      userId: user._id,
      commentId,
      value,
    });
    return newVote.save();
  }
  if (existingVote.value === value) {
    return existingVote.deleteOne();
  }
  existingVote.value = value;
  return existingVote.save();
});
