import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import societyRoutes from "./routes/societyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"; // <-- Naya joda (CORS support ke liye)

dotenv.config();
const app = express();

// --- Middlewares (Jo aapke pehle se the + CORS aur URL encoding) ---
app.use(cors({
  origin: "http://localhost:5173", // Frontend connect karne ke liye
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- Naya joda (Form data ke liye)

// base path set (Aapka purana wala)
app.get("/", (req, res) => {
  res.send("Backend is running");
})

// Aapke purane saare routes (Bilkul waisa hi)
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/society", societyRoutes);
app.use("/api/auth", authRoutes);

// --- Error Handling (Ek extra layer taaki server crash na ho) ---
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Something went wrong" });
});

// Server Listen (Aapka original logic)
app.listen(3000, () => {
  connectDB();
  console.log("Server running on port 3000");
});