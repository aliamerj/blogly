import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const apiExample = (apiKey?: string) => `const options = {
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

export const ApiUseExample = ({ apiKey }: { apiKey?: string }) => {
  return (
    <Card className="text-start w-full max-w-xl mx-auto mt-8 p-4">
      <CardHeader>
        <CardTitle>How to Use the API Key</CardTitle>
        <CardDescription>
          Example of using the API key to fetch blogs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SyntaxHighlighter language="javascript" style={darcula}>
          {apiExample(apiKey)}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
};
