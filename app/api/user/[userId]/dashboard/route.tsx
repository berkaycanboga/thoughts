import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { getFeed } from "../../../../../controllers/PostController";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ combinedPosts: [] });
  }

  const feed = await getFeed(userId);

  return NextResponse.json({ feed });
}
