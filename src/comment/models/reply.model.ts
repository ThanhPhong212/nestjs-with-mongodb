import { Schema, Document } from 'mongoose';

const ReplySchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: { type: String, require: true },
  },
  {
    timestamps: true,
    id: false,
  },
);
export { ReplySchema };

export interface Reply extends Document {
  commentId: string;
  userId: string;
  comment: string;
}
