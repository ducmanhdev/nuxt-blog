import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);

  const body = await readBody(event);
  if (!body.postId) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }

  const post = await Post.findById(body.postId);
  if (!post) {
    throw createError({ statusMessage: 'Post not found', statusCode: 400 });
  }
  if (post.bookmarkBy.find((userId) => userId.toString() === user._id.toString())) {
    post.bookmarkBy = post.bookmarkBy.filter((userId) => userId.toString() !== user._id.toString());
  } else {
    post.bookmarkBy.push(user._id);
  }
  return post.save();
});
