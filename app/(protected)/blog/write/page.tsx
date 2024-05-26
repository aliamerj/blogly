import { Navbar } from "@/components/navbar/Navbar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Eye, Flame, ImagePlus, Save, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function page() {
  return (
    <>
      <Navbar withSearch={false} />
      <main className="p-5 flex gap-5 flex-col lg:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Create New Blog </CardTitle>
                <CardDescription>
                  Share your thoughts and insights in a captivating new post.
                  Let your creativity flow!
                </CardDescription>
              </div>
              <Button>
                <Save className="mr-2 h-5 w-5" /> Save Draft
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Blog Title" />
                </div>
                <Button size="lg" className="w-52">
                  <ImagePlus className="mr-2 h-5 w-5" /> Add Media
                </Button>
                <QuillEditor />
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="flex-2">
          <CardHeader>
            <CardTitle className="text-2xl">Publish</CardTitle>
            <hr />
            <CardDescription>
              <div className="flex items-center gap-2">
                <Flame size={25} />
                <h3 className="text-lg">
                  Status : <strong>Draft</strong>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={25} />
                <h3 className="text-lg">
                  visibility : <strong>Public</strong>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={25} />
                <h3 className="text-lg">
                  Publish : <strong>Immediately</strong>
                </h3>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    className="min-h-52"
                    placeholder="Tell us a little bit about your blog"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="author name" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" className="w-full">
              <Send className="mr-2 h-6 w-6" /> Publish
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
