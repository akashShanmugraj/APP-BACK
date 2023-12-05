import express from "express";
import {
  getPosts,
  getPostById,
  getPostByUsername,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/:username", getPostByUsername);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
