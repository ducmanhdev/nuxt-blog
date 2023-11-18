import { getServerSession } from '#auth';
import { User } from '~/server/models/User';
import { Post } from '~/server/models/Post';
import { slugify } from '~/utils';

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
  return await Post.create({
    slug: slugify(body?.title),
    title: body?.title,
    content: body?.content,
    thumbnail: body?.thumbnail,
    summary: body?.summary,
    tags: body?.tags,
    author: user._id,
  });
});
