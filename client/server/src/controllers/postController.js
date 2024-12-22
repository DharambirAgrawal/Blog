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
      timeRead: timeRead || null,
      content: content || null,
      summary: summary || null,
      imageUrl: imageUrl || null,
      metaTitle: metaTitle || null,
      metaDesc: metaDesc || null,
      metaKeywords: metaKeywords || null,
      metaImage: metaImage || null,
      metaRobots: metaRobots || null,
      publishedAt: publishedAt || new Date(),
      expiresAt: expiresAt || null,
      // For categories: Check if category exists, create if not
      categories:
        categories && categories.length > 0
          ? {
              connectOrCreate: categories.map((category) => ({
                where: { name: category }, // Ensure category exists based on name
                create: {
                  name: category,
                  slug: category.toLowerCase().replace(/\s+/g, "-"), // Creating a slug
                },
              })),
            }
          : undefined, // If categories are undefined or empty, don't include this field

      // For tags: Assuming tags are also passed as an array of strings
      tags:
        tags && tags.length > 0
          ? {
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag }, // Ensure tag exists based on name
                create: {
                  name: tag,
                  slug: tag.toLowerCase().replace(/\s+/g, "-"), // Creating a slug
                },
              })),
            }
          : undefined,
    },
  });

  res.status(200).json({ message: "Saved post successfully" });
});

export const publishPost = asyncHandler(async (req, res) => {
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
    update,
  } = req.body;

  // List of required fields
  const requiredFields = [
    "title",
    "timeRead",
    "content",
    "summary",
    "imageUrl",
    "metaTitle",
    "metaDesc",
    "metaKeywords",
    "metaImage",
    "metaRobots",
    "categories",
    "tags",
  ];

  // Check if any required field is missing or undefined
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }
  const post = await prisma.post.findUnique({
    where: { slug: update.slug },
    include: {
      categories: true,
      tags: true,
    },
  });

  if (!update || !update.slug || !post) {
    // Create new post (for fresh publishing)
    await prisma.post.create({
      data: {
        title,
        slug: await generateUniqueSlug(title),
        timeRead,
        content,
        summary,
        imageUrl,
        metaTitle,
        metaDesc,
        metaKeywords,
        metaImage,
        metaRobots,
        publishedAt: publishedAt || new Date(), // Add the publish date (use current date if not provided)
        expiresAt: expiresAt || null,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: {
              name: category,
              slug: category.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
        },
        status: "PUBLISHED", // Set the status to published
        published: true,
      },
    });
  } else {
    // Update existing post
    // TODO: if the category or tag is not connected to any post delete it
    await prisma.post.update({
      where: { slug: update.slug }, // Find the post by its slug (assuming the post exists)
      include: {
        categories: true, // Include related categories
        tags: true, // Include related tags
      },
      data: {
        title,
        slug: await generateUniqueSlug(title), // Generate a new slug if necessary (e.g., title changed)
        timeRead,
        content,
        summary,
        imageUrl,
        metaTitle,
        metaDesc,
        metaKeywords,
        metaImage,
        metaRobots,
        publishedAt: publishedAt || new Date(), // Add the publish date (use current date if not provided)
        expiresAt: expiresAt || null,
        categories: {
          // Connect or create new categories
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: {
              name: category,
              slug: category.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
          // Disconnect categories that are not in the new list
          disconnect: post.categories
            ? post.categories
                .filter((category) => !categories.includes(category.name)) // Disconnect removed categories
                .map((category) => ({ id: category.id })) // Get the ids to disconnect
            : [], // If no categories exist, return an empty array
        },
        tags: {
          // Connect or create new tags
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
          // Disconnect tags that are not in the new list
          disconnect: post.tags
            ? post.tags
                .filter((tag) => !tags.includes(tag.name)) // Disconnect removed tags
                .map((tag) => ({ id: tag.id })) // Get the ids to disconnect
            : [], // If no tags exist, return an empty array
        },
        status: "PUBLISHED", // Update the status to published when publishing the post
        published: true, // Mark the post as published
      },
    });
  }

  res.status(200).json({ message: "Post published successfully" });
});

export const getPosts = asyncHandler(async (req, res) => {
  // TODO: add pagination and filtering
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      categories: true,
      tags: true,
    },
  });

  res.status(200).json(posts);
});
export const getPostcontent = asyncHandler(async (req, res) => {
  const { slug } = req.query;
  if (!slug) {
    throw new AppError("Resource not found", 400);
  }
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: true,
      tags: true,
    },
  });

  res.status(200).json(post);
});
