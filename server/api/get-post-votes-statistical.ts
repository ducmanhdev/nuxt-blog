import PostVote from '~/server/models/PostVote';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event, false);
  const { postId } = getQuery(event);

  if (!postId) {
    throw createError({
      statusMessage: 'Missing post id',
      statusCode: 400,
    });
  }
  const results = await PostVote.find({
    postId,
  });
  const totalValue = results.reduce((sum, current) => sum + current.value, 0);
  const voteOfUser = results.find((result) => result.userId.toString() === user?._id.toString());
  return {
    totalValue,
    userVoteValue: voteOfUser?.value || null,
  };
});
