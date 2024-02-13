import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import {
  getUserPostsController,
  getUserFollowingPostsController,
} from "../../../../controllers/PostController";
import {
  deleteUserController,
  updateUserController,
} from "../../../../controllers/UserController";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id as number;

  const userPosts = await getUserPostsController(userId);
  const userFollowingPosts = await getUserFollowingPostsController(userId);

  const combinedPosts = [...userPosts, ...userFollowingPosts];

  return NextResponse.json({ combinedPosts });
}

export async function PUT(req: Request, ctx: { params: { userId: string } }) {
  const { username, fullName, email } = await req.json();

  const userId = parseInt(ctx.params.userId, 10);

  const updatedUser = await updateUserController(userId, {
    username,
    fullName,
    email,
  });

  return NextResponse.json({ updatedUser });
}

export async function DELETE(
  req: Request,
  ctx: { params: { userId: string } },
) {
  const userId = parseInt(ctx.params.userId, 10);

  await deleteUserController(userId);

  return NextResponse.json({ message: "User Deleted" });
}
