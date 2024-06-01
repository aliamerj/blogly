"use client";
import _ from "lodash";
import { QuillEditor } from "@/components/quilleEditor/QuillEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Eye,
  Flame,
  LockKeyhole,
  Repeat,
  Save,
  Send,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, useForm, useWatch } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { blogSchema, updateBlogSchema } from "@/schema/blog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { patchBlog } from "@/actions/blog/patch-blog";
import { postBlog } from "@/actions/blog/post-blog";
import Image from "next/image";

type UpdateBlogFormData = z.infer<typeof updateBlogSchema>;
type BlogFormData = z.infer<typeof blogSchema>;
const getInitialData = (
  LOCAL_STORAGE_KEY: string,
  blogDB?: BlogFormData,
): BlogFormData => {
  const savedValues = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedValues) {
    return JSON.parse(savedValues);
  }
  return {
    title: blogDB?.title ?? "",
    content: blogDB?.content ?? "",
    image: blogDB?.image ?? undefined,
    author: blogDB?.author ?? "",
    description: blogDB?.description ?? "",
    status: blogDB?.status ?? "draft",
    visibility: blogDB?.visibility ?? "unlisted",
    publishedTime: blogDB?.publishedTime ?? undefined,
  };
};

const findDifferences = (
  initialData: BlogFormData,
  newData: UpdateBlogFormData,
) => {
  const differences: any = {};
  Object.keys(newData).forEach((key) => {
    const typedKey = key as keyof BlogFormData;

    if (
      typedKey === "image" &&
      newData.image &&
      typeof newData.image === "object"
    ) {
      differences[typedKey] = newData.image.name;
    }
    if (
      typedKey !== "publishedTime" &&
      typedKey !== "image" &&
      !_.isEqual(initialData[typedKey], newData[typedKey])
    ) {
      differences[typedKey] = newData[typedKey];
    }
  });
  return differences;
};

const checkDifferences = (
  currentData: UpdateBlogFormData,
  initialData?: BlogFormData,
): boolean => {
  if (!initialData) return true;
  const diff = findDifferences(initialData, currentData);
  console.log({ diff });
  return Object.keys(diff).length > 0;
};

export const BlogForm = ({
  blogDB,
  blogId,
}: {
  blogDB?: BlogFormData;
  blogId?: string;
}) => {
  const LOCAL_STORAGE_KEY = blogId ? `blogDraft_${blogId}` : "blogDraft";
  const [blogData, setBlogData] = useState(blogDB);
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const currentData = getInitialData(LOCAL_STORAGE_KEY, blogData);

  const [hasDifferences, setHasDifferences] = useState(() =>
    checkDifferences(currentData, blogData),
  );
  const form = useForm<z.infer<typeof blogSchema>>({
    defaultValues: currentData,
    resolver: zodResolver(blogSchema),
  });

  const formValues = useWatch({ control: form.control });

  // Save form values to local storage whenever they change
  useEffect(() => {
    const valuesToStore = {
      ...formValues,
      image:
        formValues.image && typeof formValues.image === "object"
          ? formValues.image.name
          : formValues.image,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(valuesToStore));
    setHasDifferences(() => checkDifferences(formValues, blogData));
  }, [formValues, LOCAL_STORAGE_KEY, blogData]);
  const formatTimestamp = (timestamp: Date) => {
    return format(timestamp, "PPPpp");
  };
  const onSubmit = (data: z.infer<typeof blogSchema>, toSave: boolean) => {
    let targetData = data;
    if (blogData) targetData = findDifferences(blogData, data);
    startTransition(() => {
      const create = async () => {
        try {
          const formData = new FormData();
          if (targetData.image && typeof targetData.image === "object") {
            formData.append("image", targetData.image);
            targetData.image = targetData.image.name;
          }
          if (blogData && blogId) {
            await patchBlog(targetData, formData, blogId);
            setBlogData(data);
            setHasDifferences(false);
            toast({
              title: "Blog updated successfully",
            });
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            route.refresh();
            return;
          }
          const newblogId = await postBlog(targetData, formData);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          if (toSave) {
            route.push("/blog/update/" + newblogId);
            route.refresh();
            return;
          }
          return route.push("/blog");
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        }
        return;
      };
      create();
    });
  };
  const handleToPrivate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("visibility", "private");
    form.setValue("status", "draft");
    form.handleSubmit((data) => onSubmit(data, true))();
  };
  const handlePublish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("status", "published");
    form.setValue("visibility", "public");
    form.handleSubmit((data) => onSubmit(data, false))();
  };

  const handleSaveDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("status", "draft");
    form.handleSubmit((data) => onSubmit(data, true))();
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
  ) => {
    event.preventDefault();
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      field.onChange(file);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Image Type",
      });
    }
  };
  return (
    <Form {...form}>
      <form className="p-5 flex gap-5 flex-col lg:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              {blogData ? (
                <div>
                  <CardTitle className="text-2xl"> Edit Blog Post </CardTitle>
                  <CardDescription>
                    Update your thoughts and insights in this post. Keep your
                    creativity flowing and make it even better!
                  </CardDescription>
                </div>
              ) : (
                <div>
                  <CardTitle className="text-2xl"> Create New Blog </CardTitle>
                  <CardDescription>
                    Share your thoughts and insights in a captivating new post.
                    Let your creativity flow!
                  </CardDescription>
                </div>
              )}
              <div className="flex flex-col gap-2">
                {blogData && blogData.visibility === "public" ? (
                  <Button
                    onClick={handlePublish}
                    disabled={isPending || !hasDifferences}
                  >
                    {isPending ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Republish
                      </>
                    ) : (
                      <>
                        <Repeat className="mr-2 h-5 w-5" />
                        Republish
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveDraft}
                    disabled={isPending || !hasDifferences}
                  >
                    {isPending ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Save Draft
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" /> Save Draft
                      </>
                    )}
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!hasDifferences}
                  onClick={() => localStorage.removeItem(LOCAL_STORAGE_KEY)}
                >
                  Undo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="title"
                          type="text"
                          placeholder="my new blog"
                          required
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {blogData?.image && (
                <Image
                  alt="image"
                  src={blogData.image}
                  width={100}
                  height={100}
                />
              )}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="image">Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, { ...field })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <QuillEditor control={form.control} />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-2">
          <CardHeader>
            <CardTitle className="text-2xl">Publish</CardTitle>
            <hr />
            <CardDescription>
              <div className="flex items-center gap-2">
                <Flame size={25} />
                <p className="text-lg">
                  Status : <strong>{blogData?.status ?? "Draft"}</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={25} />
                <p className="text-lg">
                  visibility :{" "}
                  <strong>{blogData?.visibility ?? "Unlisted"}</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={25} />
                {blogData?.publishedTime ? (
                  <p className="text-lg">
                    published:{" "}
                    <strong className="text-sm">
                      {formatTimestamp(blogData.publishedTime)}
                    </strong>{" "}
                  </p>
                ) : (
                  <p className="text-lg">
                    Publish : <strong> Immediately</strong>
                  </p>
                )}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-52"
                          placeholder="Tell us a little bit about your blog"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="auther">Author</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="auther"
                          type="text"
                          placeholder="Ali Amer"
                          required
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {blogData && blogData?.visibility === "public" ? (
              <Button
                onClick={handleToPrivate}
                variant="destructive"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                <LockKeyhole className="mr-2 h-6 w-6" />
                To Private
              </Button>
            ) : blogData?.visibility === "private" ? (
              <Button
                onClick={handlePublish}
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                <Repeat className="mr-2 h-5 w-5" />
                Republish
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                <Send className="mr-2 h-6 w-6" /> Publish
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
