import { NextResponse } from "next/server";

import {
  getPostByIdController,
  updatePostController,
  deletePostController,
} from "../../../../../../controllers/PostController";

export async function GET(
  req: Request,
  ctx: { params: { postId: string; userId: string } },
) {
  const postId = parseInt(ctx.params.postId, 10);

  const post = await getPostByIdController(postId);

  return NextResponse.json({ ...post });
}

export async function PUT(
  req: Request,
  ctx: { params: { postId: string; userId: string } },
) {
  const { content } = await req.json();

  const postId = parseInt(ctx.params.postId, 10);
  const authorId = parseInt(ctx.params.userId, 10);

  const updatedPost = await updatePostController(postId, {
    authorId: authorId,
    content,
  });

  return NextResponse.json({ updatedPost });
}

export async function DELETE(
  req: Request,
  ctx: {
    params: { postId: string; userId: string };
  },
) {
  const postId = parseInt(ctx.params.postId, 10);

  await deletePostController(postId);

  return NextResponse.json({ message: "Post deleted" });
}
