import { validateUser } from '~/server/helpers';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { _id: userId } = await validateUser(event);
  const user = await User.findById(userId).lean();
  if (!user) {
    throw createError({
      statusMessage: 'User not found',
      statusCode: 404,
    });
  }
  return user;
});
