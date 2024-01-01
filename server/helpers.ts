import { EventHandlerRequest, H3Event } from 'h3';
import { getServerSession } from '#auth';
import User from '~/server/models/User';

export const validateUser = async (event: H3Event<EventHandlerRequest>) => {
  const session = await getServerSession(event);
  console.log(session);
  const userId = (session?.user as any)?._id;

  if (!userId) {
    throw createError({ statusMessage: 'Unauthenticated missingUserId', statusCode: 403 });
  }
  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusMessage: 'Unauthenticated user', statusCode: 403 });
  }

  return user;
};
