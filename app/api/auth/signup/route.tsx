import { NextResponse } from "next/server";
import { SignUpUser } from "../../../../models/User";
import { signUp } from "../../../../controllers/AuthController";

export async function POST(req: Request) {
  const userData: SignUpUser = await req.json();
  const user = await signUp(userData);
  return NextResponse.json({ user });
}
