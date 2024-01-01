import crypto from 'crypto';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const passwordResetToken = getRouterParam(event, 'token');
  const { password, passwordConfirm } = await readBody(event);

  if (!passwordResetToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing reset password token',
    });
  }

  if (!password || !passwordConfirm) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const hashedToken = crypto.createHash('sha256').update(passwordResetToken).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token is invalid or has expired',
    });
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.clearPasswordResetToken();
  await user.save();
  return {
    message: 'Reset password successfully',
  };
});
