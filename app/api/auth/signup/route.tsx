import { NextResponse } from "next/server";

import { signUp } from "../../../../controllers/AuthController";
import { SignUpUser } from "../../../../models/User";

export async function POST(req: Request) {
  const userData: SignUpUser = await req.json();
  const user = await signUp(userData);
  return NextResponse.json({ user });
}
