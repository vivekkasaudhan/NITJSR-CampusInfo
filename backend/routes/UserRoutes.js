import express from "express";
import { registerUser } from "../controllers/authController.js";
import { 
    likePost, 
    commentPost, 
    deleteComment, 
    updateComment 
} from '../controllers/userController.js';
const router = express.Router();
router.post("/register", registerUser);
router.post('/post/:id/like', likePost);
router.post('/post/:id/comment', commentPost); 
router.delete('/post/:id/comment/:commentId', deleteComment); 
router.patch('/post/:id/comment/:commentId', updateComment);

export default router;