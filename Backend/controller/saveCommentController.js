import Comment from "../model/comment.js";
export const saveComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    return res.status(200).json({
      msg: "Comment Saved Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
