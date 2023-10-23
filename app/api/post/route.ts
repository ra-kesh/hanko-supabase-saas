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
          title,
          content: JSON.stringify(content),
          authorId: userID as string,
          postId: randomUUID(),
        },
        select: {
          postId: true,
        },
      });

      return NextResponse.json(
        { message: "New post created successfully", post },
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
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const userID = await userId();

    const posts = await prisma.post.findMany({
      where: {
        authorId: userID,
      },
    });

    return NextResponse.json({ message: "Posts retrieved", posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
