import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import {
  getUserPostsController,
  getUserFollowingPostsController,
} from "../../../../../controllers/PostController";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id as number;

  const userPosts = await getUserPostsController(userId);
  const userFollowingPosts = await getUserFollowingPostsController(userId);

  const combinedPosts = [...userPosts, ...userFollowingPosts];

  return NextResponse.json({ combinedPosts });
}
