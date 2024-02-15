import { NextResponse } from "next/server";

import { getFollowingsController } from "../../../../../controllers/FollowController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const followingId = parseInt(ctx.params.userId, 10);

  const following = await getFollowingsController(followingId);

  return NextResponse.json({ ...following });
}
