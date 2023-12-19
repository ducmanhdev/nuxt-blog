import { validateUser } from '~/server/helpers';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const query = getQuery(event);

  if (!query.postId) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }

  const isBookmark = await Post.exists({
    _id: query.postId,
    bookmarkBy: {
      $in: [user._id],
    },
  });
  return Boolean(isBookmark);
});
