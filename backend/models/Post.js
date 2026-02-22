import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
   
  },

  text: {
    type: String,
    trim: true,
  },

  image: String,
  link: String,

  likes: [
    {
     user:{ type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     },
     createdAt: {
        type: Date,
        default: Date.now,
      },
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
},{ timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;