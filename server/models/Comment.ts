import { Query, Schema, model, type Types } from 'mongoose';

interface IComment {
  originalCommentId?: Types.ObjectId;
  content: string;
  postId: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema(
  {
    originalCommentId: {
      type: Schema.Types.ObjectId,
    },
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

CommentSchema.virtual('votes', {
  ref: 'CommentVote', // The model to use
  localField: '_id', // Find votes where `localField`
  foreignField: 'commentId', // is equal to `foreignField`
  justOne: false, // We expect multiple votes, not 1
});

CommentSchema.virtual('replies', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find votes where `localField`
  foreignField: 'originalCommentId', // is equal to `foreignField`
  justOne: false, // We expect multiple votes, not 1
});

CommentSchema.pre(/^find/, function (this: Query<any, any>, next: Function) {
  this.populate({
    path: 'author',
    select: 'name id',
  })
    .populate({
      path: 'replies',
    })
    .populate({
      path: 'votes',
    });
  next();
});

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
