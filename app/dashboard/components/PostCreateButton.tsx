"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";

type Post = {
  postId: string;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

const PostCreateButton = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function createPost(): Promise<Post> {
    setIsLoading(true);

    try {
      const response = await fetch("api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new post.");
      }

      const { post } = await response.json();
      return post;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handlePostCreation(post: Post | null): ReactNode {
    router.push(`/editor/${post?.postId}`);
    toast.success("New post created!");
    return null;
  }

  function handlePostCreationError(error: Error): ReactNode {
    toast.error("Failed to create a new post.");
    console.error(error);
    return null;
  }

  async function onClickCreatePost() {
    toast.promise<Post>(createPost(), {
      loading: "Creating a new post...",
      success: handlePostCreation,
      error: handlePostCreationError,
    });
  }

  return (
    <button onClick={onClickCreatePost} className="border px-5 py-2 rounded-lg">
      + New Post
    </button>
  );
};

export default PostCreateButton;
