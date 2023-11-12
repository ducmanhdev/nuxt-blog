import { User } from '~/server/models/User';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const userId = session?.user?._id;
  if (!userId) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }
  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }
  console.log({user});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...anotherUserFields } = user.toObject();
  return anotherUserFields;
});
