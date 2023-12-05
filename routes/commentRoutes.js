import express from "express";  
import {
  getComments,
  getCommentById,
  getCommentByUsername,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();


router.get("/",getComments);
router.get("/:id",getCommentById);
router.get("/:username",getCommentByUsername);
router.post("/",createComment);
router.put("/:id",updateComment);
router.delete("/:id",deleteComment);


export default router;
