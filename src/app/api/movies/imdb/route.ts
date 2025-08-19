import { NextRequest, NextResponse } from "next/server";
import { BASE_URL, createRequestOptions } from "@/lib/tmdb";

const fetchImdbId = async (movieId: number): Promise<string | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/external_ids`,
      createRequestOptions()
    );
    if (!res.ok) throw new Error("Failed to fetch external IDs");
    const data = await res.json();
    return data.imdb_id || null;
  } catch (err) {
    console.warn(`Failed IMDb fetch for movie ${movieId}:`, err);
    return null;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { movieIds }: { movieIds: number[] } = await req.json();
    if (!Array.isArray(movieIds))
      return NextResponse.json(
        { error: "movieIds must be an array" },
        { status: 400 }
      );

    // Fetch IMDb IDs
    const results = await Promise.all(
      movieIds.map(async (id) => ({ id, imdb_id: await fetchImdbId(id) }))
    );

    return NextResponse.json({ results });
  } catch (err) {
    console.error("IMDb API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
