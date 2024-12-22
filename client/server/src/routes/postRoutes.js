import express from "express";

import {
  savePost,
  publishPost,
  getPosts,
  getPostcontent,
} from "../controllers/postController.js";
const PostRouter = express.Router();

export const postRouter = PostRouter.post("/savepost", savePost)
  .post("/publishpost", publishPost)
  .get("/getpostcontent", getPostcontent)
  .get("/getposts", getPosts);
