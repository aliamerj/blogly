"use server";
import { v4 as uuidv4 } from "uuid";
import { databaseDrizzle } from "@/db/database";
import { blogs } from "@/db/schemas/blogs";
import { blogSchema } from "@/schema/blog";
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, uploadProjectLogo } from "@/aws/s3_bucket";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
export async function postBlog(
  data: z.infer<typeof blogSchema>,
  file: FormData,
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("forbidden");
  const validate = blogSchema.safeParse({ ...data, image: file.get("image") });
  if (!validate.success) throw new Error("Invalid data provided");
  const { title, description, content, image, author, status, visibility } =
    validate.data;
  let imageUrl;
  const uid = uuidv4();
  if (image !== "undefined") {
    imageUrl = await setImageInBucket(uid, `${uid}`, image);
  }
  const blogValue: typeof blogs.$inferInsert = {
    id: uid,
    userId: session.user.id,
    title,
    description,
    author,
    status,
    image: imageUrl && imageUrl.split("?")[0],
    visibility,
    content,
    publishTime: status === "published" ? new Date() : undefined,
  };

  const blogId = await databaseDrizzle
    .insert(blogs)
    .values(blogValue)
    .returning({ id: blogs.id })
    .then((res) => res[0].id);
  return blogId;
}

async function setImageInBucket(userId: string, logoKey: string, logo: File) {
  const signedUrl = await getSignedUrl(
    s3,
    uploadProjectLogo(logoKey, logo.type, logo.size, userId),
    {
      expiresIn: 60,
    },
  );

  fetch(signedUrl, {
    method: "PUT",
    body: logo,
    headers: {
      "content-type": logo.type,
    },
  });
  return signedUrl;
}
