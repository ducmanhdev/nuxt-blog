import { Schema, model, type Types } from 'mongoose';

export interface IBookmark {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
}

const BookmarkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Bookmark must belong to a user'],
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Bookmark must belong to a post'],
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

const Bookmark = model<IBookmark>('Bookmark', BookmarkSchema);
export default Bookmark;
