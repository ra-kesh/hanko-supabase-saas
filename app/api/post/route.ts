import prisma from "@/lib/prisma";
import { userId } from "../user/route";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const userID = await userId();
    const { title, content } = await req.json();

    if (userID && title.length > 0) {
      const post = await prisma.post.create({
        data: {
          title: JSON.stringify(title),
          content: JSON.stringify(content),
          authorId: userID as string,
          postId: `${title}-${randomUUID()}`,
        },
      });

      return NextResponse.json(
        { message: "Post created", post },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
