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
    const userID = await userId();
    const { name, email } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          userId: userID as string,
          email,
          name,
        },
      });

      return NextResponse.json(
        { message: "Updated User", user },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
