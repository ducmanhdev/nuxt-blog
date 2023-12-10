import { Document, Schema, model } from 'mongoose';
import { slugify } from '~/utils';

export interface PostDocument extends Document {
  title: string;
  content: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  user: typeof Schema.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  bookmarkBy: string[];
  reviews: any;
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
    user: {
      type: String,
      required: true,
    },
    upPoint: {
      type: Number,
      default: 0,
    },
    downPoint: {
      type: Number,
      default: 0,
    },
    bookmarkBy: {
      type: [String],
      default: 0,
    },
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

PostSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'post',
  localField: '_id',
});

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
  next();
});

const Post = model<PostDocument>('Post', PostSchema);
export default Post;
