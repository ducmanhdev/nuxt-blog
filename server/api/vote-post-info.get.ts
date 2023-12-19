import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { postId } = getQuery(event);

  if (!postId) {
    throw createError({
      statusMessage: 'Missing post id',
      statusCode: 400,
    });
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw createError({
      statusMessage: 'Post not found.',
      statusCode: 404,
    });
  }
  const voteValue = post.votes.find((vote: any) => vote.userId.toString() === user._id.toString())?.value || 0;
  const voteCount = post.votes
    .map((vote: any) => vote.value)
    .reduce((total: number, current: number) => total + current, 0);
  return {
    voteValue,
    voteCount,
  };
});
