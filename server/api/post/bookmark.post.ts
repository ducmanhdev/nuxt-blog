import Bookmark from '~/server/models/Bookmark';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);

  const { postId } = await readBody(event);
  if (!postId) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }
  const bookmark = await Bookmark.exists({
    userId: user._id,
    postId,
  });
  if (!bookmark) {
    return Bookmark.create({
      userId: user._id,
      postId,
    });
  }
  return Bookmark.deleteOne({
    userId: user._id,
    postId,
  });
});
