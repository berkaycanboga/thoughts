import { NextResponse } from "next/server";

import {
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "../../../../controllers/UserController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);

  const user = await getUserByIdController(userId);

  return NextResponse.json({ ...user });
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
