import { Schema, model, type Types } from 'mongoose';

export interface IVote {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  value: 1 | -1;
}

const VoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Vote must belong to a user'],
    },
    postId: {
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

const Vote = model<IVote>('Vote', VoteSchema);
export default Vote;
