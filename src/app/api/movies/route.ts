import { NextRequest, NextResponse } from "next/server";
import { MovieSearchResponse, Movie, Genre } from "@/types/movie";
import { BASE_URL, createRequestOptions } from "@/lib/tmdb";

// Cache for genres
let genresCache: Genre[] | null = null;

const fetchGenres = async (): Promise<Genre[]> => {
  if (genresCache) return genresCache;

  try {
    const res = await fetch(
      `${BASE_URL}/genre/movie/list?language=en-US`,
      createRequestOptions()
    );
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    genresCache = data.genres || [];
    return genresCache || [];
  } catch (err) {
    console.warn("Failed to fetch genres:", err);
    return [];
  }
};

const mapGenresToMovies = (movies: Movie[], genres: Genre[]): Movie[] => {
  const genreMap = new Map(genres.map((g) => [g.id, g.name]));
  return movies.map((movie) => ({
    ...movie,
    genres:
      movie.genre_ids?.map((id) => ({
        id,
        name: genreMap.get(id) || "Unknown",
      })) || [],
  }));
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1");

    const endpoint = query
      ? `${BASE_URL}/search/movie`
      : `${BASE_URL}/movie/popular`;
    const url = `${endpoint}?language=en-US&page=${page}${
      query ? `&query=${encodeURIComponent(query)}` : ""
    }`;

    const [moviesRes, genres] = await Promise.all([
      fetch(url, createRequestOptions()),
      fetchGenres(),
    ]);
    if (!moviesRes.ok)
      return NextResponse.json(
        { error: "Failed to fetch movies" },
        { status: moviesRes.status }
      );

    const moviesData: MovieSearchResponse = await moviesRes.json();
    const moviesWithGenres = mapGenresToMovies(moviesData.results, genres);

    // Return movies with genres
    return NextResponse.json({ ...moviesData, results: moviesWithGenres });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
