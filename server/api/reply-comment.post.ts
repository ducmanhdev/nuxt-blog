import Comment from '~/server/models/Comment';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const body = await readBody(event);
  const reply = await Comment.create({
    content: body.content,
    post: body.postId,
    user: user._id,
  });
  return Comment.findByIdAndUpdate(body.originalCommentId, { $push: { replies: reply._id } });
});
