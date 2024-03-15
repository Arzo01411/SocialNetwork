// import all the necessary dependencies
const express = require("express");
const mongoose = require("mongoose"); // mongoDB interaction
const jwt = require("jsonwebtoken"); // JSON web tokens
const bcrypt = require("bcryptjs");
const cors = require("cors");

// instance of express application is created
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string
// establish a connection to mongoDB using mongoose
const mongoURI =
"mongodb+srv://Arzoo:Amazing%40102002@cluster0.itn3keq.mongodb.net/";
mongoose.connect(mongoURI);

// User model
// defining a mongoose schema 
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Post model
const PostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
});
const Post = mongoose.model("Post", PostSchema);

// Define a schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model for the contact form data
const Contact = mongoose.model("Contact", contactSchema);

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    req.user = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY"); // Split to remove 'Bearer'
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

// Register user
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY");
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

// Create a post
app.post("/posts", verifyToken, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user.userId,
      title: req.body.title,
      content: req.body.content,
    });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

// Get all posts
app.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

// Fetch a single post
app.get("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (error) {
    res.status(500).send("Error fetching post");
  }
});

// Update Post
app.put("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!post) return res.status(404).send("Post not found or unauthorized");
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.status(200).send("Post updated successfully");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
});

// Contact Form
app.post("/contact-page", async (req, res) => {
  const { name, email, message } = req.body;
  const contact = new Contact({ name, email, message });
  await contact.save();
  res.status(201).send({ message: "Contact form submitted" });
});

// Delete a post
app.delete("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!result) {
      return res.status(404).send("Post not found or unauthorized");
    }
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
