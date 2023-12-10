import { Document, Schema, model } from 'mongoose';

interface IReview extends Document {
  content: string;
  user: typeof Schema.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content can not be empty'],
    },
    post: {
      type: Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Review must belong to a post'],
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a post'],
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

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Review = model<IReview>('Review', ReviewSchema);
export default Review;
