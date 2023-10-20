import { userId } from "@/app/api/user/route";
import Editor from "@/components/editor/Editor.component";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getPostForUser(postId: string, userId: string) {
  return await prisma.post.findFirst({
    where: {
      postId: postId,
      authorId: userId,
    },
  });
}

export default async function EditorPage({
  params,
}: {
  params: { postId: string };
}) {
  const userID = await userId();
  const post = await getPostForUser(params.postId, userID as string);

  return (
    <div className=" relative grid w-full gap-10">
      <div className="absolute left-20">
        <Link href="/dashboard">back</Link>
      </div>
      <div className="w-full flex items-center justify-center">
        <Editor post={post} />
      </div>
    </div>
  );
}
