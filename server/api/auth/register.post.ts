import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, passwordConfirm } = body;
  if (!email || !password || !passwordConfirm) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }
  return User.create({
    email,
    password,
    passwordConfirm,
  });
});
