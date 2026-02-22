import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: String,

  profilePhoto: String,

  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  commentedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;