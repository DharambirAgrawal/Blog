import express from "express";

import {
  register,
  login,
  logout,
  getUser,
  getUsers,
} from "../controllers/authController.js";
import {
  checkAdminRoleMiddleware,
  checkUserMiddleware,
} from "../middleware/authMiddleware.js";

const AuthRouter = express.Router();

export const authRouter = AuthRouter.post(
  "/register",
  checkAdminRoleMiddleware,
  register
)
  .post("/login", login)
  .get("/logout", checkUserMiddleware, logout)
  .get("/users", checkAdminRoleMiddleware, getUsers)
  .get("/user/:email", checkUserMiddleware, getUser);
