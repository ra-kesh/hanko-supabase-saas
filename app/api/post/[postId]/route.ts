import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { title, content } = await req.json();
    await prisma.post.update({
      where: {
        postId: params.postId,
      },
      data: {
        title,
        content: JSON.stringify(content),
      },
    });

    return new Response("your post is updated", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
