import { validateUser } from '~/server/helpers';
import Bookmark from '~/server/models/Bookmark';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const query = getQuery(event);

  if (!query.postId) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }

  const isBookmark = await Bookmark.exists({
    userId: user._id,
    postId: query.postId,
  });
  return Boolean(isBookmark);
});
