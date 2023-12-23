import { validateUser } from '~/server/helpers';
import APIFeatures from '~/utils/api-features';
import Bookmark from '~/server/models/Bookmark';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const query = getQuery(event);

  const bookmarksOfUser = await Bookmark.find({
    userId: user._id,
  }).lean();
  const features = new APIFeatures(
    Post.find({
      _id: {
        $in: bookmarksOfUser.map((bookmark) => bookmark.postId),
      },
    }),
    query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;
  const metadata = await features.meta();
  return {
    data,
    metadata,
  };
});
