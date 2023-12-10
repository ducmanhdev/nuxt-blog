import { Post } from '~/server/models/Post';
import { slugify } from '~/utils';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
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
