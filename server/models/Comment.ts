import { Query, Document, Schema, model } from 'mongoose';

interface Vote {
  userId: Schema.Types.ObjectId;
  value: 1 | -1;
}

interface CommentDocument extends Document {
  content: string;
  post: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  replies: Schema.Types.ObjectId[];
  votes: Vote[];
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
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a post'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a post'],
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
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
    path: 'user',
    select: 'name id',
  }).populate({
    path: 'replies',
  });
  next();
});

const Comment = model<CommentDocument>('Comment', CommentSchema);
export default Comment;
