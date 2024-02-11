import { NextResponse } from "next/server";

import { searchUsersController } from "../../../../../controllers/SearchController";

export async function GET(
  req: Request,
  ctx: { params: { searchTerm: string } },
) {
  const searchTerm = ctx.params.searchTerm;

  if (typeof searchTerm !== "string") {
    return NextResponse.json(
      { error: "Invalid search term." },
      { status: 400 },
    );
  }

  const results = await searchUsersController(searchTerm);
  return NextResponse.json({ ...results });
}
