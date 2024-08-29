import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Import routes
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
