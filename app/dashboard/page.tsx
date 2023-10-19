import React from "react";
import PostCreateButton from "./components/PostCreateButton";
import { userId } from "../api/user/route";
import prisma from "@/lib/prisma";
import Link from "next/link";

const DashBaordHeader = ({ heading, text, children }) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
};

const DashboardPage = async () => {
  const userID = await userId();

  const posts = await prisma.post.findMany({
    where: {
      authorId: userID,
    },
    select: {
      postId: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="grid items-start gap-8">
      <DashBaordHeader heading="Posts" text="Create and manage posts">
        <PostCreateButton />
      </DashBaordHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => {
              return (
                <div key={post.postId}>
                  <Link href={`/editor/${post.postId}`}>{post.title}</Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div>no posts</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
