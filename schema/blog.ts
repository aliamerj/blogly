import { z } from "zod";
export const MB = 1024 * 1024; // 1Mb
export const blogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title cannot exceed 255 characters" }),
  content: z.string().min(1, { message: "Content is required" }),
  image: z
    .any()
    .refine(
      (file) => {
        return (
          file ||
          (file instanceof File && file.type.substring(0, 5) === "image")
        );
      },
      {
        message: "Invalid image",
      },
    )
    .refine((file) => file || (file instanceof File && file.size < MB), {
      message: "image is too large. Maximum size is 1 MB",
    })
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
    .any()
    .refine(
      (file) => {
        return (
          file ||
          (file instanceof File && file.type.substring(0, 5) === "image")
        );
      },
      {
        message: "Invalid image",
      },
    )
    .refine((file) => file || (file instanceof File && file.size < MB), {
      message: "image is too large. Maximum size is 1 MB",
    })
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
