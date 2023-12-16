import Comment from '~/server/models/Comment';
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

  const existingVote = comment.votes.find((vote: any) => String(vote.userId) === String(user._id));
  if (existingVote) {
    if (existingVote.value === value) {
      comment.votes = comment.votes.filter((vote: any) => String(vote.userId) !== String(user._id));
    } else {
      existingVote.value = value;
    }
  } else {
    comment.votes.push({ userId: user._id, value });
  }

  return comment.save();
});
