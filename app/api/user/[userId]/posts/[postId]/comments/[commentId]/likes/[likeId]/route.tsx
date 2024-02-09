import { NextResponse } from "next/server";

import {
  deleteLikeController,
  getCommentLikeController,
} from "../../../../../../../../../../controllers/LikeController";

export async function GET(
  req: Request,
  ctx: { params: { likeId: string; commentId: string } },
) {
  const likeId = parseInt(ctx.params.likeId, 10);
  const commentId = parseInt(ctx.params.commentId, 10);

  const like = await getCommentLikeController(likeId, commentId);

  return NextResponse.json({ ...like });
}

export async function DELETE(
  req: Request,
  ctx: { params: { likeId: string } },
) {
  const likeId = parseInt(ctx.params.likeId, 10);

  await deleteLikeController(likeId);

  return NextResponse.json({ message: "Like deleted" });
}
