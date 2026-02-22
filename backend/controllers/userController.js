import Post from "../models/Post.js"; // Adjust paths as necessary
import User from "../models/User.js";

export const likePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id; 
        if(!userId)return res.status(400).json({message:"login first"});
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = post.likes.some((like) => like.user.toString() === userId.toString());

        if (isLiked) {
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: { user: userId } }
            });
            await User.findByIdAndUpdate(userId, {
                $pull: { likedPosts: postId }
            });

            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: { user: userId } }
            });
            await User.findByIdAndUpdate(userId, {
                $push: { likedPosts: postId }
            });

            res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const commentPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { text } = req.body; 
        const userId = req.user._id;

        if (!text) return res.status(400).json({ message: "Comment text is required" });

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (!post) return res.status(404).json({ message: "Post not exists/deleted" });
        if (!user) return res.status(404).json({ message: "login first" });

        const newComment = {
            user: userId,
            text: text,
            createdAt: new Date()
        };

        post.comments.push(newComment);

        user.commentedPosts.push(postId);

        await post.save();
        await user.save();

        res.status(201).json({ 
            message: "Comment added successfully", 
            comment: newComment 
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;

        await Post.findByIdAndUpdate(id, {
            $pull: { comments: { _id: commentId } } 
        });

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { text } = req.body;

        await Post.updateOne(
            { _id: id, "comments._id": commentId }, 
            { $set: { "comments.$.text": text } }    
        );
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};