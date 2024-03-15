import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ViewPosts = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('jwtToken') !== null
  );
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        setPosts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message || 'An error occurred.');
      }
    };

    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
      });
  
      if (response.ok) {
      } else {
        console.error('Logout failed on server:', await response.text());
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      localStorage.removeItem('jwtToken');
      console.log("Logout successful. User logged out.");
      window.location.href = "/login";
    }
  };

  const editPost = (postId) => {
    localStorage.setItem('editPostId', postId);
    window.location.href = '/edit-post';
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
        alert('Post deleted successfully.');
      } else {
        console.error('Error deleting post:', error);
        setError(error.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError(error.message || 'An error occurred.');
    }
  };

  return (
    <>
    <div>
      {isLoggedIn ? (
        <div className='view-container'>
          <h2>View Posts</h2>
          {error && <p className="error-message">{error}</p>}
          <div id="posts-container">
            {posts.map((post) => (
              <div key={post._id} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.userId === JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).userId && (
                  <div className='view-btn'>
                    <button onClick={() => editPost(post._id)}>Edit</button>
                    <button onClick={() => deletePost(post._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="post-btn">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => window.location.href = '/create-post'}>Create Post</button>
          </div>
        </div>
      ) : (
        <p>Please log in to view posts.</p>
      )}
    </div>
    </>
  );
};

export default ViewPosts;