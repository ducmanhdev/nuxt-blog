import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { postId, value } = await readBody(event);

  if (![1, -1].includes(value)) {
    throw createError({
      statusMessage: 'Vote value must be 1 (up vote) or -1 (down vote).',
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

  const existingVote = post.votes.find((vote: any) => String(vote.userId) === String(user._id));
  if (existingVote) {
    if (existingVote.value === value) {
      post.votes = post.votes.filter((vote: any) => String(vote.userId) !== String(user._id));
    } else {
      existingVote.value = value;
    }
  } else {
    post.votes.push({ userId: user._id, value });
  }

  return post.save();
});
