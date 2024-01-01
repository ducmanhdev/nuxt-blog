import User from '~/server/models/User';
import Email from '~/server/mail';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email',
    });
  }
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'There is no user with email address',
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const url = getRequestURL(event);
    const protocol = url.protocol;
    const host = url.host;
    const resetPasswordUrl = `${protocol}://${host}/reset-password/${resetToken}`;
    const emailService = new Email(user, resetPasswordUrl);
    await emailService.sendPasswordReset();
    return {
      message: 'Token sent to email',
    };
  } catch (error) {
    user.clearPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    throw createError({
      statusCode: 400,
      statusMessage: 'Something went wrong, please try again',
    });
  }
});
