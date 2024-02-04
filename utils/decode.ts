import { decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const decodeToken = async (req: NextRequest) => {
  const token = req.cookies.get("next-auth.session-token")?.value;
  const decodedToken = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return decodedToken || null;
};
