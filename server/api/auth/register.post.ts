import User from '~/server/models/User';
import { sendVerificationEmail } from '~/utils/mail';
import { generateVerificationToken } from '~/utils/token';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, passwordConfirm } = body;
  if (!email || !password || !passwordConfirm) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const isEmailExist = await User.exists({ email });

  if (isEmailExist) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already exists',
    });
  }

  await User.create({
    email,
    password,
    passwordConfirm,
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
});
