import { v2 as cloudinary } from 'cloudinary';

const runtimeConfig = useRuntimeConfig();

cloudinary.config({
  cloud_name: runtimeConfig.cloudinaryCloudName,
  api_key: runtimeConfig.cloudinaryApiKey,
  api_secret: runtimeConfig.cloudinaryApiSecret,
});

export default cloudinary;
