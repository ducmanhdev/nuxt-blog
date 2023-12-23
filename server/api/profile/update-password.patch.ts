import bcrypt from 'bcrypt';
import User from '~/server/models/User';
import { validateUser } from '~/server/helpers';
import { REQUIRED_PASSWORD_LENGTH } from '~/constants';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const { oldPassword, newPassword } = await readBody(event);

  if (!oldPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Old password is incorrect',
    });
  }

  if (newPassword.length < REQUIRED_PASSWORD_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password must be at least ${REQUIRED_PASSWORD_LENGTH} characters`,
    });
  }

  if (oldPassword === newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'New password must be different from old password',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  return User.findByIdAndUpdate(user._id, {
    $set: {
      password: hashedPassword,
    },
  });
});
