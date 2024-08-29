import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/posts/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Post created successfully');
      navigate('/Home');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
