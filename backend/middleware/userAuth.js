import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userProtect = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ message: "User not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid user token" });
  }
};

export default userProtect;