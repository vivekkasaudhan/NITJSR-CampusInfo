import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Society from "../models/Society.js";


// ================= CREATE =================


export const createPost = async (req, res) => {
  try {
    const { text, link } = req.body;

    // Assuming society is logged in
    const societyId = req.user._id; // 👈 from auth middleware


    let imageUrl = "";
    let pdfUrl = "";

    // Upload Image
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "posts/images" }
      );

      imageUrl = result.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    // Upload PDF
    if (req.files?.pdf) {
      const result = await cloudinary.uploader.upload(
        req.files.pdf[0].path,
        { folder: "posts/pdfs", resource_type: "raw" }
      );

      pdfUrl = result.secure_url;
      fs.unlinkSync(req.files.pdf[0].path);
    }

    // 🔥 Create Post with society reference
    const newPost = new Post({
      society: societyId,
      text,
      link,
      image: imageUrl,
      
    });

    await newPost.save();

    // 🔥 Push post id into Society
    await Society.findByIdAndUpdate(
      societyId,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("society", "name email") // show society info
      .populate("comments.user", "name") // show commenter name
      .populate("likes.user", "name") // show liker name
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

   
    // ===== Update Text =====
    if (req.body.text !== undefined) {
      post.text = req.body.text;
    }

    if (req.body.link !== undefined) {
      post.link = req.body.link;
    }

    // ===== Update Image =====
    if (req.files?.image) {

      // delete old image
      if (post.image) {
        const publicId = post.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      }

      const result = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "posts/images" }
      );

      post.image = result.secure_url;

      fs.unlinkSync(req.files.image[0].path);
    }

    // ===== Update PDF =====
    if (req.files?.pdf) {

      if (post.pdf) {
        const publicId = post.pdf
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
      }

      const result = await cloudinary.uploader.upload(
        req.files.pdf[0].path,
        {
          folder: "posts/pdfs",
          resource_type: "raw",
        }
      );

      post.pdf = result.secure_url;

      fs.unlinkSync(req.files.pdf[0].path);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }


    // ===== Delete Image from Cloudinary =====
    if (post.image) {
      const publicId = post.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    // ===== Delete PDF from Cloudinary =====
    if (post.pdf) {
      const publicId = post.pdf
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    }

    // ===== Remove Post reference from Society (if storing posts array) =====
    await Society.findByIdAndUpdate(post.society, {
      $pull: { posts: post._id },
    });

    // ===== Delete Post =====
    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};