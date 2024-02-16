import { NextRequest } from "next/server";
import { decode } from "next-auth/jwt";

export const decodeToken = async (req: NextRequest) => {
  const isLocal = process.env.NODE_ENV === "development";
  const cookieName = isLocal
    ? "next-auth.session-token"
    : "__Secure-next-auth.session-token";

  const token = req.cookies.get(cookieName)?.value;

  const decodedToken = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decodedToken || null;
};
