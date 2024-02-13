import { NextResponse } from "next/server";

import { getLikedPostsByUserIdController } from "../../../../../controllers/UserController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);

  const likedPosts = await getLikedPostsByUserIdController(userId);

  return NextResponse.json({ ...likedPosts });
}
