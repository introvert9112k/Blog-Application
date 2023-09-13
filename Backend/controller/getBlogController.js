import blog from "../model/blog.js";

const getBlog = async (req, res) => {
  try {
    const response = await blog.findOne({ _id: req.params.id });
    if (response == null) return res.status(400).json(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: error,
    });
  }
};
export default getBlog;
