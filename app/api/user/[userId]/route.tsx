import { NextResponse } from "next/server";

import { getUserByIdController } from "../../../../controllers/UserController";

export async function GET(req: Request, ctx: { params: { userId: string } }) {
  const userId = parseInt(ctx.params.userId, 10);

  const user = await getUserByIdController(userId);

  return NextResponse.json({ ...user });
}
