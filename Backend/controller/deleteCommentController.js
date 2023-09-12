import comment from "../model/comment.js";
export const deleteComment = async (req, res) => {
  try {
    await comment.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      msg: "Comment Deletion successful",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
