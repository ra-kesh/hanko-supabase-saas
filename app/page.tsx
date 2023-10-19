import prisma from "@/lib/prisma";
import Link from "next/link";
import { userId } from "./api/user/route";

export default async function Home() {
  const userID = await userId();

  const posts = await prisma.post.findMany({
    where: {
      authorId: userID,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div>
        <h2>All Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.postId}>
              <Link href={`/create/${post.postId}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
