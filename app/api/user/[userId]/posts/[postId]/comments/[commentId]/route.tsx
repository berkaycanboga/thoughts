import { NextResponse } from "next/server";

import {
  getCommentByIdController,
  deleteCommentController,
} from "../../../../../../../../controllers/CommentController";

export async function GET(
  req: Request,
  ctx: { params: { commentId: string; postId: string } },
) {
  const commentId = parseInt(ctx.params.commentId, 10);
  const postId = parseInt(ctx.params.postId, 10);

  const comment = await getCommentByIdController(commentId, postId);

  return NextResponse.json({ ...comment });
}

export async function DELETE(
  req: Request,
  ctx: { params: { commentId: string } },
) {
  const commentId = parseInt(ctx.params.commentId, 10);

  await deleteCommentController(commentId);

  return NextResponse.json({ message: "Comment deleted" });
}
