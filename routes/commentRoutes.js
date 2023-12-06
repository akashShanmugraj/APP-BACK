const express = require("express");

const commentController = require("../controllers/commentController.js");

const {
  getComments,
  getCommentById,
  getCommentByUsername,
  createComment,
  updateComment,
  deleteComment,
} = commentController;


const router = express.Router();


router.get("/",getComments);
router.get("/:id",getCommentById);
router.get("/:username",getCommentByUsername);
router.post("/",createComment);
router.put("/:id",updateComment);
router.delete("/:id",deleteComment);


module.exports = router;
