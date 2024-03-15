import { NextResponse } from "next/server";
import { SEARCH_BASE_URL, POPULAR_BASE_URL } from "../../config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const search = searchParams.get("q");
  const endpoint = search
    ? `${SEARCH_BASE_URL}${search}&page=${page}`
    : `${POPULAR_BASE_URL}&page=${page}`;
  const data = await fetch(endpoint);
  if (!data.ok) throw new Error("Popular/Search Fetch Failed");
  const res = await data.json();
  return NextResponse.json(res);
}
