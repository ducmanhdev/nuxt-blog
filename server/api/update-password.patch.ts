import { validateUser } from '~/server/helpers';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { oldPassword, newPassword, confirmNewPassword } = await readBody(event);

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const _user = await User.findById(user._id).select('password');
  if (!_user) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  const isPasswordCorrect = await _user.checkPassword(oldPassword);
  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Old password is incorrect',
    });
  }

  _user.password = newPassword;
  _user.passwordConfirm = confirmNewPassword;
  return _user.save();
});
