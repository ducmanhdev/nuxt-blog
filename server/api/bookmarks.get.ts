import Post from '~/server/models/Post';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  return Post.find({
    bookmarkBy: {
      $in: [user._id],
    },
  });
});
