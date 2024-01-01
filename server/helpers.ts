import { EventHandlerRequest, H3Event } from 'h3';
import { getServerSession } from '#auth';
import User from '~/server/models/User';

export const validateUser = async (event: H3Event<EventHandlerRequest>) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any)?._id;
  const user = await User.findById(userId);
  if (!userId || !user) {
    throw createError({ statusMessage: 'Unauthenticated user', statusCode: 403 });
  }
  return user;
};
