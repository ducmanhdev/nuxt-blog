import { validateUser } from '~/server/helpers';
import cloudinary from '~/server/cloudinary';

export default defineEventHandler(async (event) => {
  await validateUser(event);
  const { publicId } = getQuery(event);
  if (!publicId) {
    throw createError({ statusMessage: 'Missing publicId', statusCode: 400 });
  }
  return cloudinary.uploader.destroy(publicId.toString());
});
