"use client";

import Editor from "@/components/editor/Editor.component";
import useLocalStorage from "@/lib/useLocalStorage";
import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useLocalStorage("content", []);

  const createPost = async () => {
    try {
      const response = await fetch(`/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("Post created:", data);
      } else {
        // Handle errors here
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <div className="flex justify-between w-full max-w-screen-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title"
          className="w-2/3 border-gray-200 sm:rounded-lg sm:border sm:shadow-lg p-2 focus:outline-none"
        />
        <div className="flex justify-center items-center">
          <button className="border px-3 py-2 rounded-lg" onClick={createPost}>
            publish
          </button>
        </div>
      </div>
      <Editor content={content} setContent={setContent} />
    </div>
  );
};

export default Create;
