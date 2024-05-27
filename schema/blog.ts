import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title cannot exceed 255 characters" }),
  content: z.string().min(1, { message: "Content is required" }),
  image: z
    .string()
    .max(2048, { message: "Image URL cannot exceed 2048 characters" })
    .optional(),
  author: z
    .string()
    .min(1, { message: "Author is required" })
    .max(100, { message: "Author cannot exceed 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  visibility: z.enum(["public", "private", "unlisted"]).default("public"),
  publishedTime: z.date().optional(),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title cannot exceed 255 characters" })
    .optional(),
  content: z.string().min(1, { message: "Content is required" }).optional(),
  image: z
    .string()
    .url({ message: "Invalid image URL" })
    .max(2048, { message: "Image URL cannot exceed 2048 characters" })
    .optional(),
  author: z
    .string()
    .min(1, { message: "Author is required" })
    .max(100, { message: "Author cannot exceed 100 characters" })
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),
  status: z
    .enum(["draft", "published", "archived"])
    .default("draft")
    .optional(),
  visibility: z
    .enum(["public", "private", "unlisted"])
    .default("public")
    .optional(),
  publishedTime: z.date().optional(),
});
