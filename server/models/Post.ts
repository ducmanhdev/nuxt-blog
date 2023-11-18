import { Schema, model } from 'mongoose';

export interface PostDocument extends Document {
  title: string;
  content: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  author: string;
  createdAt: Date;
}

const PostSchema = new Schema({
  slug: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = model<PostDocument>('Post', PostSchema);
