import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import {
  createPostLikeController,
  getPostLikesController,
} from "../../../../../../../controllers/LikeController";
import { authOptions } from "../../../../../auth/[...nextauth]/options";

export async function POST(req: Request, ctx: { params: { postId: string } }) {
  const session = await getServerSession(authOptions);

  const postId = parseInt(ctx.params.postId, 10);
  const userId = session!.user.id!;

  const like = await createPostLikeController(userId, postId);

  return NextResponse.json({ ...like });
}

export async function GET(req: Request, ctx: { params: { postId: string } }) {
  const postId = parseInt(ctx.params.postId, 10);

  const likes = await getPostLikesController(postId);

  return NextResponse.json({ ...likes });
}
