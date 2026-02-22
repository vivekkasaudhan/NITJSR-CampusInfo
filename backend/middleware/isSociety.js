import Society from "../models/Society.js";



export const isSociety = async (req, res, next) => {
  try {
    const society = await Society.findById(req.user._id);

    if (!society) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only societies can perform this action.",
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};