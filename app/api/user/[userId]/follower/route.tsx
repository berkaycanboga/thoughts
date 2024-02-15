import { NextResponse } from "next/server";

import { getFollowersController } from "../../../../../controllers/FollowController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const followerId = parseInt(ctx.params.userId, 10);

  const followers = await getFollowersController(followerId);

  return NextResponse.json({ ...followers });
}
