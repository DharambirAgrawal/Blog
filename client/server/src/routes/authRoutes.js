import express from "express";

import {
  register,
  login,
  logout,
  getUser,
  getUsers,
  verifyToken,
} from "../controllers/authController.js";
import { checkCookiesMiddleware } from "../middleware/authMiddleware.js";

const AuthRouter = express.Router();

export const authRouter = AuthRouter.post("/login", login)
  .get("/verify", verifyToken)
  .get("/logout", logout);
// .post("/register",checkCookiesMiddleware,register) need to work on this
// .get("/users", checkAdminRoleMiddleware, getUsers)
// .get("/user/:email", checkUserMiddleware, getUser);
