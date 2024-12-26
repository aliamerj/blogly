"use server";

import { databaseDrizzle } from "@/db/database";
import { blogs } from "@/db/schemas/blogs";
import { updateBlogSchema } from "@/schema/blog";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, uploadProjectLogo } from "@/aws/s3_bucket";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function patchBlog(
  data: z.infer<typeof updateBlogSchema>,
  file: FormData,
  blogId: string,
) {
  const session = await getServerSession(authOptions)
  if(!session?.user?.id) throw new Error("Unauthorized");
  const validate = updateBlogSchema.safeParse({
    ...data,
    image: file.get("image"),
  });
  if (!validate.success) throw new Error("Invalid data provided");
  const { title, description, content, image, author, status, visibility } =
    validate.data;
  let imageUrl;
  if (image !== "undefined") {
    imageUrl = await setImageInBucket(blogId, `${blogId}`, image);
  }
  const blogValue = {
    title,
    description,
    author,
    status,
    image: imageUrl && imageUrl.split("?")[0],
    visibility,
    content,
    publishTime: status === "published" ? new Date() : undefined,
  };

  await databaseDrizzle
    .update(blogs)
    .set(blogValue)
    .where(eq(blogs.id, blogId));
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
