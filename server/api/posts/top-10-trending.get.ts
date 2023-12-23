import Post from '~/server/models/Post';
import Vote from '~/server/models/Vote';
import APIFeatures from '~/utils/api-features';

export default defineEventHandler(async (event) => {
  const votePosts = await Vote.aggregate([
    { $group: { _id: '$postId', votes: { $sum: '$value' } } },
    { $sort: { votes: -1 } },
    { $limit: 10 },
  ]);

  const votePostIds = votePosts.map((doc) => doc._id);
  const votePostsCount = votePosts.length;

  // Find remaining posts that don't have votes or have a few votes
  let remainingPosts;
  if (votePostsCount < 10) {
    remainingPosts = await Post.find({ _id: { $nin: votePostIds } })
      .sort({ createdDate: -1 }) // Replace createdDate with your date field
      .limit(10 - votePostsCount);
  }

  // Combine votePosts and remainingPosts
  const topPosts = votePosts.concat(remainingPosts);
  const topPostIds = topPosts.map((post) => post._id);
  const query = getQuery(event);
  const features = new APIFeatures(
    Post.find({
      _id: { $in: topPostIds },
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
