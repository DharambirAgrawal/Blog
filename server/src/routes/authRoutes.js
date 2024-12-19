import express from "express";

import { register, login, logout } from "../controllers/authController.js";

const AuthRouter = express.Router();

export const authRouter = AuthRouter.post("/register", register)
  .post("/login", login)
  .get("/logout", logout);
