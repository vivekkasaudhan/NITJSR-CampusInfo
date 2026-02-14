import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
    required: true,
  },

  text: {
    type: String,
    trim: true,
  },

  image: String,
  pdf: String,
  link: String,

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;