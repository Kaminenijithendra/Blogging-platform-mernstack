import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';  
import PostDetailPage from './Pages/PostDetailsPage';
import CreatePost from './components/CreatePost';  
import EditPost from './components/EditPost';  
import LoginPage from './Pages/LoginPage';  
import SignupPage from './Pages/SignupPage';  
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="/posts/:id" element={<PrivateRoute component={PostDetailPage} />} />
          <Route path="/create" element={<PrivateRoute component={CreatePost} />} />
          <Route path="/edit/:id" element={<PrivateRoute component={EditPost} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
