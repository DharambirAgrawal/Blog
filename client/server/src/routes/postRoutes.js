import express from "express";

import {
  savePost,
  publishPost,
  getPosts,
  getPostcontent,
  saveImageData,
  getImages,
} from "../controllers/postController.js";
import { checkCookiesMiddleware } from "../middleware/authMiddleware.js";
const PostRouter = express.Router();

export const postRouter = PostRouter.post(
  "/savepost",
  checkCookiesMiddleware,
  savePost
)
  .post("/publishpost", checkCookiesMiddleware, publishPost)
  .post("/upload/image", checkCookiesMiddleware, saveImageData)
  .get("/images/get", getImages)
  .get("/getpostcontent", checkCookiesMiddleware, getPostcontent)
  .get("/getposts", checkCookiesMiddleware, getPosts);
