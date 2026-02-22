import express from "express";
import { registerSociety } from "../controllers/authController.js";
import upload from "../middleware/upload.js";
import {
  createPost,
  updatePost,
  deletePost
} from "../controllers/SocietyController.js";

const router = express.Router();


router.post("/register", registerSociety);


router.post(
  "/create",
 
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  createPost
);


// ================= UPDATE POST =================
router.put(
  "/update/:id",

  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  updatePost
);


// ================= DELETE POST =================
router.delete(
  "/delete/:id",
  
  deletePost
);

export default router;
