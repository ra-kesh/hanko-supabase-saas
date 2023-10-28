"use client";

import {
  ButtonProps,
  buttonVariants,
} from "@/components/button/Button.component";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PostCreateButton = ({ className, variant, ...props }: ButtonProps) => {
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
    <button
      onClick={onClickCreatePost}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      + New Post
    </button>
  );
};

export default PostCreateButton;
