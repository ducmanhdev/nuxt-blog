import { EventHandlerRequest, H3Event } from 'h3';
import { getServerSession } from '#auth';
import User from '~/server/models/User';

export const validateUser = async (event: H3Event<EventHandlerRequest>, throwError = true) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any)?._id;

  if (!userId) {
    if (!throwError) return null;
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }
  const user = await User.findById(userId).lean();
  if (!user) {
    if (!throwError) return null;
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  return user;
};
