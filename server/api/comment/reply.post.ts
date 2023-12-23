import Comment from '~/server/models/Comment';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const body = await readBody(event);
  return Comment.create({
    content: body.content,
    postId: body.postId,
    author: user._id,
    originalCommentId: body.originalCommentId,
  });
});
