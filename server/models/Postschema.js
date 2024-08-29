import { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String, // Store the path or URL of the image
    required: false, // Make it optional
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default PostSchema;
