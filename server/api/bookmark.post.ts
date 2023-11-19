import { getServerSession } from '#auth';
import { User } from '~/server/models/User';
import { Post } from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const userId = session?.user?._id;
  if (!userId) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }
  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }
  const body = await readBody(event);
  if (!body.post_id) {
    throw createError({ statusMessage: 'Missing post id', statusCode: 400 });
  }
  const doc = await Post.findById(body.post_id);
  if (!doc) {
    throw createError({ statusMessage: 'Post not found', statusCode: 404 });
  }
  if (doc.bookmarkBy.includes(userId)) {
    doc.bookmarkBy = doc.bookmarkBy.filter((id) => id !== userId);
  } else {
    doc.bookmarkBy.push(userId);
  }
  await doc.save();
  return { statusMessage: 'Success', statusCode: 200 };
});
