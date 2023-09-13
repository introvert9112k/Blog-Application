import express from "express";
import {
  signupUser,
  loginUser,
  logOutUser,
} from "../controller/userController.js";
import { createCategory } from "../controller/categoryController.js";
import saveBlog from "../controller/saveBlogController.js";
import getAllBlogs from "../controller/getBlogsController.js";
import getBlog from "../controller/getBlogController.js";
import updateBlog from "../controller/updateBlogController.js";
import deleteBlog from "../controller/deleteBlogController.js";
import { saveComment } from "../controller/saveCommentController.js";
import { getAllComments } from "../controller/getAllCommentsController.js";
import { deleteComment } from "../controller/deleteCommentController.js";
import { authenticateToken } from "../controller/jwtController.js";
import refreshToken from "../controller/refreshTokenController.js";
/*creating the router */

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/refresh", refreshToken);
router.post("/categories", authenticateToken, createCategory);
router.post("/save/blog", authenticateToken, saveBlog);
router.post("/getBlogs", getAllBlogs);
router.post("/getBlogById/:id", authenticateToken, getBlog);
router.post("/update/:id", authenticateToken, updateBlog);
router.post("/delete/:id", authenticateToken, deleteBlog);
router.post("/comment/save", authenticateToken, saveComment);
router.post("/getAllComments/:id", authenticateToken, getAllComments);
router.post("/deleteComment/:id", authenticateToken, deleteComment);
export default router;
