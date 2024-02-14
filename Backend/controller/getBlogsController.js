import blog from "../model/blog.js";
const getAllBlogs = async (req, res) => {
  try {
    /*?category=electronics&price=100&brand=example-brand.
    req.query stores the key value pairs of the queires, in the above example
    req.query = {
      categroy : electronics,
      price : 100,
      brand : example-brand
    }*/
    const blogCategory = req.query.category;
    const username = req.query.user;
    let blogs;
    //If username exits,then return all blogs of particular user
    if (username) blogs = await blog.find({ userName: username });
    //If blog category is provided,return the posts which has given category
    else if (blogCategory)
      blogs = await blog.find({
        categories: {
          $in: [blogCategory],
        },
      });
    //if nothing specified then return all the blogs
    else blogs = await blog.find({});
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};
export default getAllBlogs;
