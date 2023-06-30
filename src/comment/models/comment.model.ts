import { Schema, Document } from 'mongoose';

const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    id: false,
  },
);
export { commentSchema };

export interface Comment extends Document {
  postId: string;
  userId: string;
  comment: string;
}
