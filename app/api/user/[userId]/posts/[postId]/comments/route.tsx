import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import {
  createCommentController,
  getCommentsByPostIdController,
} from "../../../../../../../controllers/CommentController";
import { authOptions } from "../../../../../auth/[...nextauth]/options";

export async function POST(req: Request, ctx: { params: { postId: string } }) {
  const { content } = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const postId = parseInt(ctx.params.postId, 10);

  const newComment = await createCommentController({
    content,
    userId,
    postId,
  });

  return NextResponse.json({ ...newComment });
}

export async function GET(req: Request, ctx: { params: { postId: string } }) {
  const postId = parseInt(ctx.params.postId, 10);

  const comments = await getCommentsByPostIdController(postId);

  return NextResponse.json({ ...comments });
}
