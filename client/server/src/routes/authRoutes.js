import express from "express";

import {
  register,
  login,
  logout,
  getUser,
  getUsers,
  verifyToken,
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
  .get("/verify", verifyToken)
  .get("/logout", logout)
  .get("/users", checkAdminRoleMiddleware, getUsers)
  .get("/user/:email", checkUserMiddleware, getUser);
