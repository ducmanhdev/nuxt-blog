import { readFiles } from 'h3-formidable';
import { validateUser } from '~/server/helpers';
import cloudinary from '~/server/cloudinary';

export default defineEventHandler(async (event) => {
  await validateUser(event);
  const { files } = await readFiles(event);
  return cloudinary.uploader.upload(files?.file?.[0]?.filepath, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    overwrite: true,
    folder: 'blog',
  });
});
