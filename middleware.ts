import { NextRequest, NextResponse } from "next/server";

import { decodeToken } from "./utils/decode";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const decodedToken = await decodeToken(req);

  if (!decodedToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const currentUser = decodedToken!.id;
  const targetUserId = parseInt(req.nextUrl.pathname.split("/")[3]);

  if (targetUserId && targetUserId !== currentUser)
    return NextResponse.json(
      { error: "Forbidden: Operation on behalf of another user" },
      { status: 403 },
    );

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*", "/dashboard/:path*"],
};
