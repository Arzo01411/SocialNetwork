import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = () => {
  const postId = localStorage.getItem('editPostId');
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!postId) {
      alert('No post selected for editing');
      window.location.href = 'view-posts';
      return;
    }

    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setError(null);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError(error.message || 'An error occurred.');
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const submitEdit = async () => {
    if (!post) {
      alert("No post selected for editing");
      window.location.href = "/view-posts";
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/posts/${post._id}`, {
        title,
        content,
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.status === 200) {
        alert("Post updated successfully!");
        window.location.href = "/view-posts";
      } else {
        alert("Error updating post");
      }
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {post ? (
        <div className='container'>
          <h2>Edit Post</h2>
          <input
            type="text"
            id="edit-post-title"
            placeholder="Post Title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            id="edit-post-content"
            placeholder="Post Content"
            value={content}
            onChange={handleContentChange}
          />
          <button onClick={submitEdit} className='edit-btn'>Save Changes</button>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default EditPost;