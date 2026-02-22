import express from "express";
import { registerSociety } from "../controllers/authController.js";
import upload from "../middleware/upload.js";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts
} from "../controllers/SocietyController.js";
import { isSociety } from "../middleware/isSociety.js";

const router = express.Router();


router.post("/register", registerSociety);


router.post(
  "/create",
 isSociety,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  createPost
);


//=================Read Post================

router.get("/find/:id", getAllPosts);


// ================= UPDATE POST =================
router.put(
  "/update/:id",
isSociety,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  updatePost
);


// ================= DELETE POST =================
router.delete(
  "/delete/:id",
  isSociety,
  deletePost
);

export default router;
