import mongoose from 'mongoose';
import PostSchema from './PostSchema.js';

// Helper function to get the dynamic model for a specific user
const getPostModelForUser = (username) => {
  // Check if the model already exists to avoid redefinition
  return mongoose.models[username] || mongoose.model(username, PostSchema, username);
};

export default getPostModelForUser;
