import { cookies } from "next/headers";
import * as jose from "jose";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function userId() {
  const token = cookies().get("hanko")?.value;
  const payload = jose.decodeJwt(token ?? "");
  return payload.sub;
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
