import { getUserByEmail } from '~/server/db/user';
import { generatePasswordResetToken } from '~/utils/token';
import { sendPasswordResetEmail } from '~/utils/mail';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email',
    });
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email not found',
    });
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: 'Reset email sent!' };
});
