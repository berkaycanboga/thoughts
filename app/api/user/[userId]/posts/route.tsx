import { NextResponse } from "next/server";

import {
  createPostController,
  getUserPostsController,
} from "../../../../../controllers/PostController";

const userLastPostTime: Record<number, number> = {};

export async function POST(req: Request, ctx: { params: { userId: string } }) {
  const { content } = await req.json();
  const userId = parseInt(ctx.params.userId, 10);

  const currentTime = new Date().getTime() / 1000;
  if (
    userId in userLastPostTime &&
    currentTime - userLastPostTime[userId] < 5
  ) {
    return NextResponse.json(
      { error: "Please wait before creating another post." },
      { status: 400 },
    );
  }

  const newPost = await createPostController({
    authorId: userId,
    content,
  });

  userLastPostTime[userId] = currentTime;

  return NextResponse.json({ newPost });
}

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);
  const userPosts = await getUserPostsController(userId);

  return NextResponse.json({ ...userPosts });
}
