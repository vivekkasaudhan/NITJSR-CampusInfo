import express from "express";
import { registerSociety } from "../controllers/societyController.js";

const router = express.Router();

router.post("/register", registerSociety);

export default router;
