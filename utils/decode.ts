import { NextRequest } from "next/server";
import { decode } from "next-auth/jwt";

export const decodeToken = async (req: NextRequest) => {
  const token = req.cookies.get("next-auth.session-token")?.value;
  const decodedToken = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return decodedToken || null;
};
