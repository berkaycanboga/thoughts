import { NextResponse } from "next/server";

import { getPostsByUserCommentsController } from "../../../../../controllers/UserController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);

  const commentedPosts = await getPostsByUserCommentsController(userId);

  return NextResponse.json({ ...commentedPosts });
}
