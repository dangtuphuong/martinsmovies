import { NextRequest, NextResponse } from "next/server";
import { MovieSearchResponse, Movie, Genre } from "@/types/movie";

const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

// Cache for genres
let genresCache: Genre[] | null = null;

const createRequestOptions = () => {
  if (!BEARER_TOKEN) {
    throw new Error("TMDB_BEARER_TOKEN is not configured");
  }

  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
};

const fetchGenres = async (): Promise<Genre[]> => {
  if (genresCache) {
    return genresCache;
  }

  const url = `${BASE_URL}/genre/movie/list?language=en-US`;
  const options = createRequestOptions();

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.status}`);
  }

  const data = await response.json();
  genresCache = data?.genres || [];
  return genresCache || [];
};

const mapGenresToMovies = (movies: Movie[], genres: Genre[]): Movie[] => {
  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]));

  return movies.map((movie) => ({
    ...movie,
    genres:
      movie.genre_ids?.map((id) => ({
        id,
        name: genreMap.get(id) || "Unknown",
      })) || [],
  }));
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1");

    const endpoint = query
      ? `${BASE_URL}/search/movie`
      : `${BASE_URL}/movie/popular`;

    const url = `${endpoint}?language=en-US&page=${page}${
      query ? `&query=${encodeURIComponent(query)}` : ""
    }`;

    const options = createRequestOptions();

    // Fetch movies and genres concurrently
    const [moviesResponse, genres] = await Promise.all([
      fetch(url, options),
      fetchGenres(),
    ]);

    if (!moviesResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movies" },
        { status: moviesResponse.status }
      );
    }

    const moviesData: MovieSearchResponse = await moviesResponse.json();
    const moviesWithGenres = mapGenresToMovies(moviesData.results, genres);

    return NextResponse.json({
      ...moviesData,
      results: moviesWithGenres,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
