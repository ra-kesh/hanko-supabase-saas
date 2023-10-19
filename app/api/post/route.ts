import prisma from "@/lib/prisma";
import { userId } from "../user/route";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

function generateRandomNumbers(length: number) {
  let result = "";
  const characters = "0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charCodeAt(randomIndex);
  }

  return result;
}

function slugiFy(text: string) {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .substring(0, 50);

  const randomNumbers = generateRandomNumbers(5);
  return `${slug}-${randomNumbers}`;
}

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
          postId: slugiFy(title),
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
