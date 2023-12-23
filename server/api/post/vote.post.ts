import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';
import Vote from '~/server/models/Vote';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { postId, value } = await readBody(event);

  if (![1, -1].includes(value)) {
    throw createError({
      statusMessage: 'Vote value must be 1 (up vote) or -1 (down vote).',
      statusCode: 400,
    });
  }

  const post = await Post.exists({
    _id: postId,
  });
  if (!post) {
    throw createError({
      statusMessage: 'Post not found.',
      statusCode: 404,
    });
  }

  const existingVote = await Vote.findOne({
    userId: user._id,
    postId: postId,
  });
  if (!existingVote) {
    const newVote = new Vote({
      userId: user._id,
      postId,
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
