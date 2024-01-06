import { getPasswordResetTokenByToken } from '~/server/db/password-reset-token';
import { getUserByEmail } from '~/server/db/user';
import PasswordResetToken from '~/server/models/PasswordResetToken';

export default defineEventHandler(async (event) => {
  const { token, password, passwordConfirm } = await readBody(event);
  if (!token || !password || !passwordConfirm) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return createError({
      statusCode: 400,
      statusMessage: 'Token does not exist!',
    });
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return createError({
      statusCode: 400,
      statusMessage: 'Token has expired!',
    });
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return createError({
      statusCode: 400,
      statusMessage: 'Email does not exist!',
    });
  }

  existingUser.password = password;
  existingUser.passwordConfirm = passwordConfirm;
  await existingUser.save();

  await PasswordResetToken.findByIdAndDelete(existingToken.id);

  return { success: 'Password updated!' };
});
