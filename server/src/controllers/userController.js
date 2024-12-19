import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { validateEmail } from "../utils/utils.js";

export const subscribeUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError("Resource not found", 400);
  }
  if (!validateEmail(email)) {
    throw new AppError("Please enter valid email", 400);
  }
  console.log(email);
  res.send("gg");
});
