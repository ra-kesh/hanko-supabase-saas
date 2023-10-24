"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PostCreateButton = () => {
  const router = useRouter();

  async function createPost(): Promise<void> {
    const response = await fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Title",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create a new post.");
    }

    const { post } = await response.json();

    router.refresh();

    router.push(`/editor/${post?.postId}`);
  }

  function onClickCreatePost() {
    toast.promise<void>(createPost(), {
      loading: "Creating a new post...",
      success: "New post created!",
      error: "Failed to create a new post.",
    });
  }

  return (
    <button onClick={onClickCreatePost} className="border px-5 py-2 rounded-lg">
      + New Post
    </button>
  );
};

export default PostCreateButton;
