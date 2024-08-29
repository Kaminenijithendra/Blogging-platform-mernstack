import multer from 'multer'; // Import multer for handling file uploads
import getPostModelForUser from '../models/Post.js'; // Adjust path if needed

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for each image
  },
});

const upload = multer({ storage });

// Ensure the collection is created for a user
const ensureCollectionExists = async (username) => {
  const PostModel = getPostModelForUser(username);
  try {
    // Check if the collection exists by running a dummy query
    await PostModel.findOne({}).exec();
  } catch (err) {
    console.error('Collection creation failed:', err.message);
  }
};

// Get all posts for the logged-in user
export const getPosts = async (req, res) => {
  const { username } = req.user;
  try {
    const PostModel = getPostModelForUser(username);
    const posts = await PostModel.find({ userId: req.user.id });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post for the logged-in user
export const createPost = [
  upload.single('image'), // Handle single file upload
  async (req, res) => {
    const { title, content, author } = req.body;
    const userId = req.user.id;
    const username = req.user.username;
    const imagePath = req.file ? req.file.path : null; // Get uploaded image path

    if (!title || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const PostModel = getPostModelForUser(username);
      await ensureCollectionExists(username);

      const newPost = new PostModel({
        title,
        content,
        author,
        userId,
        image: imagePath, // Store image path
      });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

// Get a single post by ID
export const getPostById = async (req, res) => {
  const { username } = req.user;
  try {
    const PostModel = getPostModelForUser(username);
    const post = await PostModel.findById(req.params.id);

    if (post) {
      if (post.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a post by ID
export const updatePost = [
  upload.single('image'), // Handle single file upload for post update
  async (req, res) => {
    const { username } = req.user;
    const { title, content, author } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get uploaded image path if available

    try {
      const PostModel = getPostModelForUser(username);
      const post = await PostModel.findById(req.params.id);

      if (post) {
        if (post.userId.toString() !== req.user.id) {
          return res.status(403).json({ message: 'Not authorized' });
        }

        // Update the post with new data
        const updatedData = { title, content, author };
        if (imagePath) {
          updatedData.image = imagePath; // Update image path if a new image is uploaded
        }

        const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedPost);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { username } = req.user;
  try {
    const PostModel = getPostModelForUser(username);
    const post = await PostModel.findById(req.params.id);

    if (post) {
      if (post.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      await PostModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
