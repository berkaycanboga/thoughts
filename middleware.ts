import { NextRequest, NextResponse } from "next/server";

import { decodeToken } from "./utils/decode";

export async function middleware(req: NextRequest) {
  const decodedToken = await decodeToken(req);
  const requestedUrl = new URL(req.url);

  if (
    requestedUrl.pathname.startsWith("/signin") ||
    requestedUrl.pathname.startsWith("/signup") ||
    requestedUrl.pathname.startsWith("/api/auth/") ||
    requestedUrl.pathname.startsWith("/logo") ||
    requestedUrl.pathname === "/"
  ) {
    return NextResponse.next();
  }

  if (!decodedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const currentUser = decodedToken!.id;

  const userId = requestedUrl.pathname.split("/")[3];

  const isGetMethod = req.method === "GET";

  if (isGetMethod) {
    return NextResponse.next();
  }

  const includesLikes = requestedUrl.pathname.includes("/likes");
  const includesComments = requestedUrl.pathname.includes("/comments");
  const includesFollow = requestedUrl.pathname.includes("/follow");

  if (includesLikes || includesComments || includesFollow) {
    if (parseInt(userId) !== currentUser) {
      requestedUrl.pathname = requestedUrl.pathname.replace(
        `/${userId}`,
        `/${currentUser}`,
      );
    }
  } else {
    const targetUserId = parseInt(userId);
    if (targetUserId !== currentUser) {
      return NextResponse.json(
        { error: "Forbidden: Operation on behalf of another user" },
        { status: 403 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*", "/dashboard/:path*", "/:username/"],
};
