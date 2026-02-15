import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Society from "../models/Society.js";
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check Admin
    let account = await Admin.findOne({ email });
    if (account) {
      const match = await bcrypt.compare(password, account.password);
      if (!match) return res.status(400).json({ message: "Invalid password" });

      const token = createToken(account._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,     // production me true
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ message: "Admin login successful" });
    }

    // 2️⃣ Check Society
    account = await Society.findOne({ email });
    if (account) {
      if (!account.verified) {
        return res.status(403).json({
          message: "Society not verified by admin yet",
        });
      }

      const match = await bcrypt.compare(password, account.password);
      if (!match) return res.status(400).json({ message: "Invalid password" });

      const token = createToken(account._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ message: "Society login successful" });
    }

    // 3️⃣ Check User
    account = await User.findOne({ email });
    if (account) {
      const match = await bcrypt.compare(password, account.password);
      if (!match) return res.status(400).json({ message: "Invalid password" });

      const token = createToken(account._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ message: "User login successful" });
    }

    return res.status(404).json({ message: "Account not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const registerSociety = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if already exists
    const existing = await Society.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Society already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create society (verified = false by default)
    await Society.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message:"Society registered successfully. Wait for admin approval.",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logout=async(req,res)=>{
  try {
    res.clearCookie("token",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
    })
    return res.json({message:"Logout successful"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

export const registerUser=async(req,res)=>{
  try {
     const { name, email, password } = req.body;
     const existing=await User.findOne({email});
     if(existing)return res.status(400).json({message:"user already register"});
     const hashedPassword = await bcrypt.hash(password, 10);
     await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message:"User registered successfully. Wait for admin approval.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const registerAdmin=async(req,res)=>{
  try {
     const { name, email, password } = req.body;
     const existing=await Admin.findOne({email});
     if(existing)return res.status(400).json({message:"admin already register"});
     const hashedPassword = await bcrypt.hash(password, 10);
     await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message:"Admin registered successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
