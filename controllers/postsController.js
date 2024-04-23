const mongoose = require("mongoose");
const Posts = require("../schemas/postsSchema.js");
const asyncHandler = require("express-async-handler");


//fetch all posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find({});
  res.json(posts);
});

//fetch post by id
const getPostById = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//fetch post by username
const getPostByUsername = asyncHandler(async (req, res) => {
    const post = await Posts.findOne({ userName: req.params.userName });
    
    if (post) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error("Post not found");
    }
    }
);

//create post
const createPost = asyncHandler(async (req, res) => {
  const post = new Posts({
    postTitle: req.body.postTitle,
    postDescription: req.body.postDescription,
    postImage: req.body.postImage,
    postImageType: req.body.postImageType,
    postDate: req.body.postDate,
    postAuthor: req.body.postAuthor,
    postComments: req.body.postComments,
    postLikes: req.body.postLikes,
    postDislikes: req.body.postDislikes,
    postTags: req.body.postTags
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

//update post
const updatePost = asyncHandler(async (req, res) => {
  const {
    userName,
    title,
    description,
    upvotes,
    downvotes,
    comments,
    date,
    location,
    postPic,
    postPicType,
  } = req.body;

  const post = await Posts.findById(req.params.id);

  if (post) {
    post.userName = userName;
    post.title = title;
    post.description = description;
    post.upvotes = upvotes;
    post.downvotes = downvotes;
    post.comments = comments;
    post.date = date;
    post.location = location;
    post.postPic = postPic;
    post.postPicType = postPicType;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//delete post
const deletePost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

module.exports= { getPosts, getPostById, getPostByUsername, createPost, updatePost, deletePost };