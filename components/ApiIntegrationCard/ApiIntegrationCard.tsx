import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

export const ApiIntegrationCard = ({ apiKey }: { apiKey?: string }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto my-14 p-4">
      <CardHeader>
        <CardTitle className="text-2xl">API Integration</CardTitle>
        <CardDescription className="text-lg">
          Learn how to integrate with our API to manage your blogs.
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

export default ApiIntegrationCard;
