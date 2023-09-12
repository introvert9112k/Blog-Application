import comment from "../model/comment.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await comment.find({ postId: req.params.id }).lean(); // Use the lean() method

    // Process comments to remove circular references
    // const commentsWithoutCircularReferences = comments.map((comment) => ({
    //   _id: comment._id,
    //   userName: comment.userName,
    //   postId: comment.postId,
    //   date: comment.date,
    //   commentDescription: comment.commentDescription,
    // }));

    // return res.status(200).json(commentsWithoutCircularReferences);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
