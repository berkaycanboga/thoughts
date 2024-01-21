import { NextResponse } from "next/server";
import {
  getUserPostsController,
  getUserFollowingPostsController,
} from "../../../../../controllers/PostController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);

  const userPosts = await getUserPostsController(userId);
  const userFollowingPosts = await getUserFollowingPostsController(userId);

  const combinedPosts = [...userPosts, ...userFollowingPosts];

  return NextResponse.json({ combinedPosts });
}
