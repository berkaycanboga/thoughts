import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import {
  createCommentLikeController,
  getCommentLikesController,
} from "../../../../../../../../../controllers/LikeController";
import { authOptions } from "../../../../../../../auth/[...nextauth]/options";

export async function POST(
  req: Request,
  ctx: { params: { commentId: string } },
) {
  const session = await getServerSession(authOptions);

  const commentId = parseInt(ctx.params.commentId, 10);
  const userId = session!.user.id!;

  const like = await createCommentLikeController(userId, commentId);

  return NextResponse.json({ like });
}

export async function GET(
  req: Request,
  ctx: { params: { commentId: string } },
) {
  const commentId = parseInt(ctx.params.commentId, 10);

  const likes = await getCommentLikesController(commentId);

  return NextResponse.json({ ...likes });
}
