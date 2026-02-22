import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ================= CREATE =================
export const createPost = async (req, res) => {
  try {
    const { text, link } = req.body;

    let imageUrl = "";
    let pdfUrl = "";

    // 🔥 Upload Image
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "posts/images" }
      );

      imageUrl = result.secure_url;

      fs.unlinkSync(req.files.image[0].path); // remove local file
    }

    // 🔥 Upload PDF
    if (req.files?.pdf) {
      const result = await cloudinary.uploader.upload(
        req.files.pdf[0].path,
        { folder: "posts/pdfs", resource_type: "raw" }
      );

      pdfUrl = result.secure_url;

      fs.unlinkSync(req.files.pdf[0].path);
    }

    const newPost = new Post({
      text,
      link,
      image: imageUrl,
      pdf: pdfUrl,
    });

    await newPost.save();

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
 


 export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ===== Update normal fields only if sent =====
    if (req.body.text !== undefined) {
      post.text = req.body.text;
    }

    if (req.body.link !== undefined) {
      post.link = req.body.link;
    }

    // ===== Update Image only if new image uploaded =====
    if (req.files?.image) {

      // delete old image from cloudinary (if exists)
      if (post.image) {
        const publicId = post.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`posts/images/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "posts/images" }
      );

      post.image = result.secure_url;

      fs.unlinkSync(req.files.image[0].path);
    }

    // ===== Update PDF only if new pdf uploaded =====
    if (req.files?.pdf) {

      if (post.pdf) {
        const publicId = post.pdf.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`posts/pdfs/${publicId}`, {
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
      const publicId = post.image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(
        `posts/images/${publicId}`
      );
    }

    // ===== Delete PDF from Cloudinary =====
    if (post.pdf) {
      const publicId = post.pdf.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(
        `posts/pdfs/${publicId}`,
        { resource_type: "raw" }
      );
    }

    // ===== Delete Post from DB =====
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