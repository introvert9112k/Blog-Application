import blog from "../model/blog.js";
const deleteBlog = async (req, res) => {
  try {
    const response = await blog.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      msg: "Blog deleted sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};
export default deleteBlog; 