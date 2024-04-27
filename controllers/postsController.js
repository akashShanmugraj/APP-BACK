const mongoose = require("mongoose");
const Posts = require("../schemas/postsSchema.js");
const asyncHandler = require("express-async-handler");
const { post } = require("../routes/profileRoutes.js");
const Profile = require("../schemas/profileSchema.js");

function computeDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

//fetch all posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find({});
  res.json(posts);
});
const getPostsbyLocation = asyncHandler(async (req, res) => {
  const xpos = req.params.xpos;
  const ypos = req.params.ypos;

  // get all posts
  const allposts = await Posts.find({});
  const distancelimit = 100;
  const nearposts = [];
  for (let i = 0; i < allposts.length; i++) {
    const post = allposts[i];
    const x = post.postLocation[0];
    const y = post.postLocation[1];
    if (computeDistance(xpos, ypos, x, y) < distancelimit) {
      nearposts.push(post);
    }
  }
  res.json(nearposts);
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
});

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
    postTags: req.body.postTags,
    postLocation: req.body.postLocation,
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

const viewPost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.postid);

  const profile = await Profile.findById(req.params.userid);
  const user = req.params.userid;

  console.log(req.params);
  try {
    if (!post.postView.includes(user)) {
      post.postView.push(user);
      post.postViewCounter += 1;
    }
    console.log(post.postTags);
    console.log(post.postTags.length);
    for (let i = 0; i < post.postTags.length; i++) {
      console.log(i);
      profile.postTags.set(
        post.postTags[i],
        (profile.postTags.get(post.postTags[i]) || 0) + 1
      );
    }
    await post.save();
    await profile.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

module.exports = {
  getPosts,
  getPostById,
  getPostByUsername,
  createPost,
  updatePost,
  deletePost,
  getPostsbyLocation,
  viewPost,
};
