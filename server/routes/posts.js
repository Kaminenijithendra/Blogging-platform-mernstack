import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Get all posts for the logged-in user
router.get('/', authenticateToken, getPosts);

// Create a new post for the logged-in user
router.post('/posts', authenticateToken, createPost);

// Get a single post by ID
router.get('/post/:id', authenticateToken, getPostById);

// Update a post by ID
router.put('/update/:id', authenticateToken, updatePost);

// Delete a post by ID
router.delete('/delete/:id', authenticateToken, deletePost);

export default router;
