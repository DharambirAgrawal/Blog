// src/server.js
// import dotenv from "dotenv";
import cors from "cors";
// dotenv.config();
import express from "express";
import { errorHandler, AppError } from "./src/errors/index.js";
import { logger } from "./src/utils/logger.js";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

// Load environment variables

const app = express();

//connect DB
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// Middleware
// app.use(cors({
//   origin: 'https://your-nextjs-app.com', // Allow only your front-end domain
//   credentials: true,  // Allow cookies to be sent
// }));

import multer from "multer";
const upload = multer({}); //midddleware for handeling file
app.use(cors());
// app.use(upload.any());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//routes
import { authRouter } from "./src/routes/authRoutes.js";
import { userRouter } from "./src/routes/userRoutes.js";
import { postRouter } from "./src/routes/postRoutes.js";

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", upload.any(), postRouter);

// Handle 404 routes
app.use(
  "/api",
  asyncHandler((req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  })
);

// Global error handling middleware (should be last)
app.use(errorHandler);

export default app;
