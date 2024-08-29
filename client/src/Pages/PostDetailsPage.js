import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PostDetailPage.css'; // Import the CSS file

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/post/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Post deleted successfully');
      navigate('/Home');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      {post.image && <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="post-image" />}
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
      <div className="post-actions">
        <button className="action-button" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        <button className="action-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PostDetailPage;
