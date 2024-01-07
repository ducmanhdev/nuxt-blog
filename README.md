# Nuxt blog

![image](public/screenshot.jpeg)

Key Features:
- 📦 Pnpm (faster than npm and yarn)
- 📦 Nuxt.js 
- 📱 Responsive design
- 🔐 Next-auth v4 
- 🔑 Credentials Provider
- 🔒 Forgot password functionality
- ✉️ Email verification
- 🤔 Forgot password
- 📈 Send email with Resend
- 🔄 Upload images with Cloudinary
- 📝 Tinymce editor
### Install packages

```shell
pnpm install
```

### Setup .env file

```dotenv
BASE_URL=

MONGODB_URI=

AUTH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRRET=

TINYMCE_API_KEY=

RESEND_API_KEY=
```

### Start the app

```shell
pnpm run dev
```