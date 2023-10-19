import { userId } from "@/app/api/user/route";
import prisma from "@/lib/prisma";
import React from "react";

async function getPostForUser(postId: string, userId: string) {
  return await prisma.post.findFirst({
    where: {
      postId: postId,
      authorId: userId,
    },
  });
}

const Page = async ({ params }: { params: { postId: string } }) => {
  const userID = await userId();

  const post = await getPostForUser(params.postId, userID as string);

  console.log(post);

  return <div>{params.postId}</div>;
};

export default Page;
