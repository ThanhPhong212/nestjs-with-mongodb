import { Schema, Document } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    id: false,
  },
);

export { postSchema };

export interface Post extends Document {
  title: string;
  content: string;
  like: string[];
}
