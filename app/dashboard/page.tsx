import React from "react";
import PostCreateButton from "./components/PostCreateButton";
import { userId } from "../api/user/route";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { DashBaordHeader } from "./components/DashBoardHeader";
import {
  EmptyPlaceholder,
  EmptyPlaceholderDescription,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
} from "@/components/empty/EmptyPlaceholder";
import { Icons } from "@/components/Icons.component";

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
        <PostCreateButton variant={"outline"} />
      </DashBaordHeader>
      <div>
        {posts?.length ? (
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2  md:grid-cols-4">
            {posts.map((post) => {
              return (
                <Link
                  href={`/editor/${post.postId}`}
                  key={post.postId}
                  className="cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg border p-2">
                    <div className="flex h-[180px] flex-col rounded-md p-6 space-y-2">
                      <h3 className="font-bold"> {post.title}</h3>
                      <p className="text-sm">
                        {formatDate(post.createdAt?.toDateString())}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholderIcon>
              <Icons.post className="h-10 w-10" />
            </EmptyPlaceholderIcon>
            <EmptyPlaceholderTitle>No posts to display</EmptyPlaceholderTitle>
            <EmptyPlaceholderDescription>
              You have&apos;t created any posts yet, start by clicking &apos;
              New Post &apos; button.
            </EmptyPlaceholderDescription>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
