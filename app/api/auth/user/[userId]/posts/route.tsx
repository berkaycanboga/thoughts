import { NextResponse } from "next/server";
import {
  createPostController,
  getUserPostsController,
} from "../../../../../../controllers/PostController";

export async function POST(req: Request, ctx: { params: { userId: string } }) {
  const { content } = await req.json();
  const newPost = await createPostController({
    authorId: parseInt(ctx.params.userId, 10),
    content,
  });

  return NextResponse.json({ newPost });
}

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);
  const userPosts = await getUserPostsController(userId);

  return NextResponse.json({ userPosts });
}
