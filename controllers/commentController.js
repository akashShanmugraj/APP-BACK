import mongoose from "mongoose";
import Comment from "../schemas/commentSchema.js";
import asyncHandler from "express-async-handler";

//fetch all comments
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({});
  res.json(comments);
});

//fetch comment by id
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

//fetch comment by username
const getCommentByUsername = asyncHandler(async (req, res) => {
    const comment = await Comment.findOne({ userName: req.params.userName });
    
    if (comment) {
        res.json(comment);
    } else {
        res.status(404);
        throw new Error("Comment not found");
    }
    }
);

//create comment
const createComment = asyncHandler(async (req, res) => {
  const comment = new Comment({
    userName: req.body.userName,
    title: req.body.title,
    description: req.body.description,
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes,
    comments: req.body.comments,
    date: req.body.date,
    location: req.body.location,
    commentPic: req.body.commentPic,
    commentPicType: req.body.commentPicType,
  });

  const createdComment = await comment.save();
  res.status(201).json(createdComment);
});

//update comment
const updateComment = asyncHandler(async (req, res) => {
  const {
    userName,
    title,
    description,
    upvotes,
    downvotes,
    comments,
    date,
    location,
    commentPic,
    commentPicType,
  } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (comment) {
    comment.userName = userName;
    comment.title = title;
    comment.description = description;
    comment.upvotes = upvotes;
    comment.downvotes = downvotes;
    comment.comments = comments;
    comment.date = date;
    comment.location = location;
    comment.commentPic = commentPic;
    comment.commentPicType = commentPicType;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

//delete comment
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    await comment.remove();
    res.json({ message: "Comment removed" });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

export { getComments, getCommentById, getCommentByUsername, createComment, updateComment, deleteComment };