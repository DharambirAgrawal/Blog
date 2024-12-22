import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../../app.js";
import { generateUniqueSlug } from "../utils/utils.js";

// data = {
//   title: "How to Build a Blog from Scratch",
//   timeRead: 5,
//   content:
//     "Building a blog from scratch is an exciting project that allows you to customize every aspect of your site. In this guide, we will walk you through the essential steps required to create a blog, including choosing a platform, selecting a theme, and publishing your first post.",
//   summary:
//     "A step-by-step guide on how to build a blog from scratch, from platform selection to publishing your first post.",
//   imageUrl: "https://example.com/featured-image.jpg",
//   metaTitle: "How to Build a Blog from Scratch | MyBlog",
//   metaDesc:
//     "Learn how to create a blog from scratch with this comprehensive guide. We'll walk you through choosing a platform, selecting a theme, and publishing your first post.",
//   metaKeywords:
//     "blog, build blog, blog tutorial, create blog, blogging platform",
//   metaImage: "https://example.com/og-image.jpg",
//   metaRobots: "index, follow",

//   categories: ["Web Development", "Blogging Tips"],
//   tags: ["tutorial", "blogging", "web development"],
// };

export const savePost = asyncHandler(async (req, res) => {
  const {
    title,
    timeRead,
    content,
    summary,
    imageUrl,
    metaTitle,
    metaDesc,
    metaKeywords,
    metaImage,
    metaRobots,
    publishedAt,
    expiresAt,
    categories,
    tags,
  } = req.body;
  if (!title) {
    throw new AppError("Resource not found", 400);
  }
  await prisma.post.create({
    data: {
      title: title,
      slug: await generateUniqueSlug(title),
      timeRead: timeRead,
      content: content,
      summary: summary,
      imageUrl: imageUrl,
      metaTitle: metaTitle,
      metaDesc: metaDesc,
      metaKeywords: metaKeywords,
      metaImage: metaImage,
      metaRobots: metaRobots,
      // For categories: Check if category exists, create if not
      categories: {
        connectOrCreate: categories.map((category) => ({
          where: { name: category }, // Ensure category exists based on name
          create: {
            name: category,
            slug: category.toLowerCase().replace(/\s+/g, "-"), // Creating a slug
          },
        })),
      },
      // For tags: Assuming tags are also passed as an array of strings
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag }, // Ensure tag exists based on name
          create: {
            name: tag,
            slug: tag.toLowerCase().replace(/\s+/g, "-"), // Creating a slug
          },
        })),
      },
    },
  });

  res.status(200).json({ message: "Saved post successfully" });
});
export const publishPost = asyncHandler(async (req, res) => {
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

export const getPosts = asyncHandler(async (req, res) => {});
export const getPostcontent = asyncHandler(async (req, res) => {});
