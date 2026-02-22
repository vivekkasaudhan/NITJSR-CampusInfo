import express from "express";
import { registerAdmin } from "../controllers/authController.js";
import { verifySociety, deleteSociety } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.put("/verify-society/:id", protectAdmin, verifySociety);
router.delete("/delete-society/:id", protectAdmin, deleteSociety);

export default router;
