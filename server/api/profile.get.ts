import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...anotherUserFields } = user.toObject();
  return anotherUserFields;
});
