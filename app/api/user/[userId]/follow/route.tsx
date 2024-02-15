import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import {
  followUserController,
  unfollowUserController,
} from "../../../../../controllers/FollowController";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function POST(req: Request, ctx: { params: { userId: string } }) {
  const session = await getServerSession(authOptions);

  const followerId = session?.user.id as number;
  const followingId = parseInt(ctx.params.userId, 10);

  await followUserController(followerId, followingId);

  return NextResponse.json({ message: "User Followed" });
}

export async function DELETE(
  req: Request,
  ctx: { params: { userId: string } },
) {
  const session = await getServerSession(authOptions);

  const followerId = session?.user.id as number;
  const followingId = parseInt(ctx.params.userId, 10);

  await unfollowUserController(followerId, followingId);

  return NextResponse.json({ message: "User Unfollowed" });
}
