import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';

const removeBookmark = (bookmarks: string[], userId: string) => {
  return bookmarks.filter((id) => id !== userId);
};

const addBookmark = (bookmarks: string[], userId: string) => {
  bookmarks.push(userId);
  return bookmarks;
};

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);

  const body = await readBody(event);
  if (!body.post_id) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }

  const doc = await Post.findById(body.post_id);
  if (!doc) {
    throw createError({ statusMessage: 'Post not found', statusCode: 400 });
  }

  if (doc.bookmarkBy.includes(user._id)) {
    doc.bookmarkBy = removeBookmark(doc.bookmarkBy, user._id);
  } else {
    doc.bookmarkBy = addBookmark(doc.bookmarkBy, user._id);
  }

  await doc.save();

  return { statusMessage: 'Success', statusCode: 200 };
});
