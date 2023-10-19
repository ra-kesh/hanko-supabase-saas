"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PostCreateButton = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onClickCreatePost() {
    setIsLoading(true);

    const response = await fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Title",
      }),
    });

    setIsLoading(false);

    const post = await response.json();

    router.refresh();

    router.push(`/editor/${post.postId}`);
  }

  return (
    <button onClick={onClickCreatePost} className="border px-5 py-2 rounded-lg">
      + New Post
    </button>
  );
};

export default PostCreateButton;
