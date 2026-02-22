import Post from "../models/Post.js";
import User from "../models/User.js";

/* ================= LIKE POST ================= */

export const likePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;   // ✅ secure

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.some(
      (like) => like.user.toString() === userId.toString()
    );

    if (isLiked) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: { user: userId } }
      });

      await User.findByIdAndUpdate(userId, {
        $pull: { likedPosts: postId }
      });

      return res.json({ message: "Post unliked successfully" });
    }

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: { user: userId } }
    });

    await User.findByIdAndUpdate(userId, {
      $push: { likedPosts: postId }
    });

    res.json({ message: "Post liked successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= COMMENT POST ================= */

export const commentPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;   // ✅ secure

    if (!text)
      return res.status(400).json({ message: "Comment text is required" });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const newComment = {
      user: userId,
      text,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= DELETE COMMENT ================= */

export const deleteComment = async (req, res) => {
  try {
    const { id: postId, commentId } = req.params;
    const userId = req.user._id;   // ✅ secure

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    // 🔥 only comment owner can delete
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    comment.deleteOne();
    await post.save();

    res.json({ message: "Comment deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE COMMENT ================= */

export const updateComment = async (req, res) => {
  try {
    const { id: postId, commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;   // ✅ secure

    if (!text)
      return res.status(400).json({ message: "Text is required" });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    // 🔥 only owner can edit
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this comment" });
    }

    comment.text = text;
    await post.save();

    res.json({ message: "Comment updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};