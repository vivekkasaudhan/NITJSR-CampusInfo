import Society from "../models/Society.js";
import Post from "../models/Post.js";

export const verifySociety = async (req, res) => {
  try {
    const { id } = req.params;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    if (society.verified) {
      return res.status(400).json({
        success: false,
        message: "Society is already verified",
      });
    }

    society.verified = true;
    await society.save();

    res.status(200).json({
      success: true,
      message: "Society verified successfully",
      society,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const deleteSociety = async (req, res) => {
  try {
    const { id } = req.params;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

     // Delete all posts of this society
    await Post.deleteMany({ society: id });

    //delete socity 
    await society.deleteOne();

    res.status(200).json({
      success: true,
      message: "Society deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};