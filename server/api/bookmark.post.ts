import type { Types } from 'mongoose';
import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';

const removeBookmark = (bookmarks: Types.ObjectId[], userId: Types.ObjectId) => {
  return bookmarks.filter((id) => id !== userId);
};

const addBookmark = (bookmarks: Types.ObjectId[], userId: Types.ObjectId) => {
  bookmarks.push(userId);
  return bookmarks;
};

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);

  const body = await readBody(event);
  if (!body.post_id) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }

  const post = await Post.findById(body.post_id);
  if (!post) {
    throw createError({ statusMessage: 'Post not found', statusCode: 400 });
  }

  if (post.bookmarkBy.includes(user._id)) {
    post.bookmarkBy = removeBookmark(post.bookmarkBy, user._id);
  } else {
    post.bookmarkBy = addBookmark(post.bookmarkBy, user._id);
  }

  await post.save();

  return { statusMessage: 'Success', statusCode: 200 };
});
