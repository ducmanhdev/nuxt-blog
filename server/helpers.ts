import { EventHandlerRequest, H3Event } from 'h3';
import { getServerSession } from '#auth';

export const validateUser = async (event: H3Event<EventHandlerRequest>) => {
  const session = await getServerSession(event);
  const user = session?.user;
  if (!user?._id) {
    throw createError({
      statusMessage: 'Unauthenticated',
      statusCode: 401,
    });
  }
  return user;
};
