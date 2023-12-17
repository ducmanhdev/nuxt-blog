import { Query, Schema, model, type Types } from 'mongoose';

interface IVote {
  userId: Types.ObjectId;
  value: 1 | -1;
}

interface IComment {
  content: string;
  postId: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  votes: IVote[];
  replies: Types.ObjectId[];
  isReply: boolean;
}

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

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content can not be empty'],
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Comment must belong to a post'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    isReply: {
      type: Boolean,
      default: false,
    },
    votes: [VoteSchema],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

CommentSchema.pre(/^find/, function (this: Query<any, any>, next: Function) {
  this.populate({
    path: 'author',
    select: 'name id',
  }).populate({
    path: 'replies',
  });
  next();
});

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
