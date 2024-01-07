import { getVerificationTokenByToken } from '~/server/db/verification-token';
import { getUserByEmail } from '~/server/db/user';
import VerificationToken from '~/server/models/VerificationToken';

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing token!',
    });
  }

  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token does not exist!',
    });
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token has expired!',
    });
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email does not exist!',
    });
  }

  await existingUser.updateOne({
    emailVerified: new Date(),
    email: existingToken.email,
  });

  await VerificationToken.findByIdAndDelete(existingToken.id);

  return { success: 'Email verified!' };
});
