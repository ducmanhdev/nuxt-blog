import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import { validateUser } from '~/server/helpers';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { fields, form } = await readFiles(event);
  const fieldsSingle = firstValues(form, fields, []);
  const { title, content, thumbnail, summary, categories } = fieldsSingle;
  if (!title || !content || !thumbnail || !summary || !categories) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }
  return await Post.create({
    title,
    content,
    thumbnail,
    summary,
    categories,
    author: user._id,
  });
});
