"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";
const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ align: [] }],
  [
    {
      color: [
        "#FF5733",
        "#FF7F50",
        "#FF4500",
        "#FFD700",
        "#FF6347",
        "#FFA500",
        "#FFDAB9",
        "#33FF57",
        "#ADFF2F",
        "#7FFF00",
        "#7CFC00",
        "#32CD32",
        "#00FF00",
        "#00FA9A",
        "#3357FF",
        "#1E90FF",
        "#00BFFF",
        "#87CEEB",
        "#4682B4",
        "#4169E1",
        "#8A2BE2",
        "red",
        "blue",
        "green",
        "purple",
        "pink",
        "brown",
        "#000000",
        "#444444",
        "#666666",
        "#999999",
        "#CCCCCC",
        "#E0E0E0",
        "#F3F3F3",
        "#FFFFFF",
      ],
    },
    {
      background: [
        "#FF5733",
        "#FF7F50",
        "#FF4500",
        "#FFD700",
        "#FF6347",
        "#FFA500",
        "#FFDAB9",
        "#33FF57",
        "#ADFF2F",
        "#7FFF00",
        "#7CFC00",
        "#32CD32",
        "#00FF00",
        "#00FA9A",
        "#3357FF",
        "#1E90FF",
        "#00BFFF",
        "#87CEEB",
        "#4682B4",
        "#4169E1",
        "#8A2BE2",
        "red",
        "blue",
        "green",
        "purple",
        "pink",
        "brown",
        "#000000",
        "#444444",
        "#666666",
        "#999999",
        "#CCCCCC",
        "#E0E0E0",
        "#F3F3F3",
        "#FFFFFF",
      ],
    },
  ],
  ["link", "image", "video", "formula"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  ["clean"],
];

export const QuillEditor = ({ control }: { control: Control<any> }) => {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReactQuill
              className="flex-1 ql-custom"
              modules={{
                toolbar: toolbarOptions,
              }}
              theme="snow"
              placeholder="Start writing your inspiring story here..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
