import Review from '~/server/models/Review';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const body = await readBody(event);
  return await Review.create({
    content: body.content,
    post: body.postId,
    user: user._id,
  });
});
