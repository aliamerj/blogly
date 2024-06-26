import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const apiExampleAllBlogs = (apiKey?: string) => `const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ${apiKey ?? "blogly_*************"}',
    'Content-Type': 'application/json',
  },
};

fetch('https://blogly.co/api/blogs', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  `;

const apiExampleSpecificBlog = (apiKey?: string) => `const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ${apiKey ?? "blogly_*************"}',
    'Content-Type': 'application/json',
  },
};

fetch('https://blogly.co/api/blogs/{id}', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  `;

export const ApiUseExample = ({ apiKey }: { apiKey?: string }) => {
  return (
    <Card className="text-start w-full max-w-2xl mx-auto mt-8 p-4">
      <CardHeader>
        <CardTitle>How to Use the API Key</CardTitle>
        <CardDescription>
          Example of using the API key to fetch blogs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Get All Blogs</h3>
            <SyntaxHighlighter language="javascript" style={darcula}>
              {apiExampleAllBlogs(apiKey)}
            </SyntaxHighlighter>
          </div>
          <hr />
          <div>
            <h3 className="text-xl font-bold mb-2">Get Specific Blog</h3>
            <SyntaxHighlighter language="javascript" style={darcula}>
              {apiExampleSpecificBlog(apiKey)}
            </SyntaxHighlighter>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
