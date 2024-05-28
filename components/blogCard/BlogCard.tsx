import { blogs } from "@/db/schemas/blogs";
import React from "react";
import {
  ImageOff as LucideImage,
  User,
  Calendar,
  EyeOff,
  Globe,
  Lock,
  Edit3,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
const truncateText = (text: string, limit: number) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};

export const BlogCard = ({
  blog: { title, image, author, description, status, visibility, publishTime },
}: {
  blog: typeof blogs.$inferSelect;
}) => {
  return (
    <Card className="flex flex-col w-full max-w-lg mx-auto shadow-md hover:shadow-lg transition-transform duration-300 rounded-lg overflow-hidden bg-white dark:bg-gray-800 cursor-pointer transform hover:-translate-y-1 hover:scale-105">
      {image ? (
        <div className="relative w-full h-56">
          <Image src={image} fill={true} alt={title} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-56">
          <LucideImage size={200} />
        </div>
      )}
      <CardHeader className="flex-1 p-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
          {truncateText(description, 20)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-6 py-4 flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            By {author}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          {publishTime ? (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Published on {format(new Date(publishTime), "PPP")}
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not Published Yet
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {visibility === "public" ? (
            <Globe className="w-4 h-4 text-green-500" />
          ) : visibility === "unlisted" ? (
            <EyeOff className="w-4 h-4 text-yellow-500" />
          ) : (
            <Lock className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Edit3
            className={`w-4 h-4 ${
              status === "published"
                ? "text-green-500"
                : status === "draft"
                  ? "text-yellow-500"
                  : "text-red-500"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              status === "published"
                ? "text-green-500"
                : status === "draft"
                  ? "text-yellow-500"
                  : "text-red-500"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
