import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import '../styles/Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>


      
      <Link to="/create">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <LogoutButton />
    </div>
  );
};

export default Home;
