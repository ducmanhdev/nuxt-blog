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
  return Post.find({
    bookmarkBy: {
      $in: [userId],
    },
  });
});
