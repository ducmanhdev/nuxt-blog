import { v2 as cloudinary } from 'cloudinary';
import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import User from '~/server/models/User';
import { validateUser } from '~/server/helpers';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRRET,
});

interface IUpdatePayload {
  avatar?: string;
  name: string;
  birthday: string;
  phone: string;
  gender: string;
}

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { fields, files, form } = await readFiles(event);
  const fieldsSingle = firstValues(form, fields, []);

  const uploadPayload: IUpdatePayload = {
    name: fieldsSingle.name,
    birthday: fieldsSingle.birthday,
    phone: fieldsSingle.phone,
    gender: fieldsSingle.gender,
  };
  const avatarUploadFile = files?.avatarUploadFile?.[0]?.filepath;
  if (avatarUploadFile) {
    const { url } = await cloudinary.uploader.upload(avatarUploadFile, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      public_id: user._id.toString(),
      overwrite: true,
      folder: 'avatar',
    });
    uploadPayload.avatar = url;
  }

  return User.findByIdAndUpdate(user._id, {
    $set: uploadPayload,
  });
});
