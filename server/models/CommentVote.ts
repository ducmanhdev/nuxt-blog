import { Schema, model, type Types } from 'mongoose';

interface ICommentVote {
  commentId: Types.ObjectId;
  userId: Types.ObjectId;
  value: -1 | 1;
}

const CommentVoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Vote must belong to a user'],
    },
    commentId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Vote must belong to a post'],
    },
    value: {
      type: Number,
      enum: [-1, 1],
      required: [true, 'Vote must have a value'],
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

const Comment = model<ICommentVote>('CommentVote', CommentVoteSchema);
export default Comment;
