import { Document, Schema, model, Query } from 'mongoose';
import { slugify } from '~/utils';

interface Vote {
  userId: Schema.Types.ObjectId;
  value: 1 | -1;
}

export interface PostDocument extends Document {
  title: string;
  content: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  bookmarkBy: Schema.Types.ObjectId[];
  comments: any;
  votes: Vote[];
}

const BookmarkedBySchema = new Schema({
  type: Schema.Types.ObjectId,
});

const VoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Vote must belong to a user'],
  },
  value: {
    type: Number,
    enum: [-1, 1],
    required: [true, 'Vote must have a value'],
  },
});

const PostSchema = new Schema(
  {
    slug: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    summary: {
      type: String,
    },
    tags: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to a user'],
    },
    bookmarkBy: [BookmarkedBySchema],
    votes: [VoteSchema],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

PostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

PostSchema.pre(/^find/, function (this: Query<any, any>, next: Function) {
  this.populate({
    path: 'author',
    select: 'name id',
  });
  next();
});

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
  next();
});

const Post = model<PostDocument>('Post', PostSchema);
export default Post;
