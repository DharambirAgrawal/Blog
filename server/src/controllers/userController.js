import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { validateEmail } from "../utils/utils.js";
import { SUBSCRIPTION_MESSAGE } from "../messages/emailMessage.js";
import { sendEmail } from "../services/emailService.js";
import { prisma } from "../../app.js";
export const subscribeUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError("Resource not found", 400);
  }
  if (!validateEmail(email)) {
    throw new AppError("Please enter valid email", 400);
  }
  const subscription = await prisma.subscription.create({
    data: {
      email,
    },
  });
  if (!subscription) {
    throw new AppError("Error subscribing user", 500);
  }
  await sendEmail(email, SUBSCRIPTION_MESSAGE());

  res.status(200).json({ message: "Subscribed successfully" });
});
