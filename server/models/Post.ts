import { Schema, model, Query, type Types } from 'mongoose';
import { slugify } from '~/utils';

interface IVote {
  userId: Types.ObjectId;
  value: 1 | -1;
}

export interface IPost {
  title: string;
  content: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  bookmarkBy: Types.ObjectId[];
  votes: IVote[];
}

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
    bookmarkBy: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    votes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: [true, 'Vote must belong to a user'],
        },
        value: {
          type: Number,
          enum: [-1, 1],
          required: [true, 'Vote must have a value'],
        },
      },
    ],
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

// PostSchema.virtual('comments', {
//   ref: 'Comment',
//   foreignField: 'post',
//   localField: '_id',
// });

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

const Post = model<IPost>('Post', PostSchema);
export default Post;
