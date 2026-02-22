import express from "express";
import { registerUser } from "../controllers/authController.js";
import {
  likePost,
  commentPost,
  deleteComment,
  updateComment
} from "../controllers/userController.js";

import userProtect from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);

// 🔥 protected user routes
router.post("/post/:id/like", userProtect, likePost);
router.post("/post/:id/comment", userProtect, commentPost);
router.delete("/post/:id/comment/:commentId", userProtect, deleteComment);
router.patch("/post/:id/comment/:commentId", userProtect, updateComment);

export default router;