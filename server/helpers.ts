import { EventHandlerRequest, H3Event } from 'h3';
import { getServerSession } from '#auth';
import { User, UserDocument } from '~/server/models/User';

export const validateUser = async (event: H3Event<EventHandlerRequest>) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any)?._id;

  if (!userId) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  const user = await User.findById(userId);

  if (!user) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 });
  }

  return user as UserDocument & { _id: any };
};
