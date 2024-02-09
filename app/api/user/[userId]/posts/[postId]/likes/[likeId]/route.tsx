import { NextResponse } from "next/server";

import {
  deleteLikeController,
  getPostLikeController,
} from "../../../../../../../../controllers/LikeController";

export async function GET(
  req: Request,
  ctx: { params: { likeId: string; postId: string } },
) {
  const likeId = parseInt(ctx.params.likeId, 10);
  const postId = parseInt(ctx.params.postId, 10);

  const like = await getPostLikeController(likeId, postId);

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
