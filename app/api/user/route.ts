import { cookies } from "next/headers";
import * as jose from "jose";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function userId() {
  const token = cookies().get("hanko")?.value;
  const payload = jose.decodeJwt(token ?? "");
  const userID = payload.sub;
  return userID;
}

export async function POST(req: Request) {
  try {
    const { id, email } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          userId: id,
          email,
        },
      });

      return NextResponse.json(
        { message: "User created successfully", user },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "User creation failed", error });
  }
}
export async function GET(req: Request) {
  try {
    const userID = await userId();

    const user = await prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User details found", user },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "could not get user", error });
  }
}

export async function PATCH(req: Request) {
  try {
    const userID = await userId();

    const { name } = await req.json();
    const user = await prisma.user.update({
      where: {
        userId: userID,
      },
      data: {
        name,
      },
      select: {
        name: true,
      },
    });

    return NextResponse.json(
      { message: "your name is updated", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "your name could not be updated", error },
      { status: 500 }
    );
  }
}
