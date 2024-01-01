import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  return await validateUser(event);
});
