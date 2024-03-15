import React, { useState } from "react";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const createPost = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert("Post created successfully!");
        window.location.href = "/view-posts";
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="container">
      <h2>Create Post</h2>
      <input type="text" id="post-title" placeholder="Post Title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
      <textarea id="post-content" placeholder="Post Content" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} ></textarea>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
