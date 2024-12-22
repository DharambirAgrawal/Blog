import express from "express";
import { subscribeUser } from "../controllers/userController.js";

const UserRouter = express.Router();

export const userRouter = UserRouter.post("/subscribe", subscribeUser);
