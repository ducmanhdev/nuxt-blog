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

  const body = await readBody(event);
  await User.findByIdAndUpdate(userId, {
    $set: {
      name: body.name,
      birthday: body.birthday,
      phone: body.phone,
    },
  });
  return true;
});
