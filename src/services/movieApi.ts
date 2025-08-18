import {
  MovieSearchParams,
  MovieSearchResponse,
  Movie,
  Genre,
} from "@/types/movie";

// Use Bearer token
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Zjg3ZjRlN2M0MGI3ZTJiZTc5NDhjM2I5Yjk0ODY1ZiIsIm5iZiI6MTc1NTQ5MjY5OC4zNDA5OTk4LCJzdWIiOiI2OGEyYjE1YTRkYTQyMDcyODcwYzA1MzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.efJAdM-RvVKeh-zaTIVyhlI7hIyuiTq-dJ6_3MTQOVk";
const BASE_URL = "https://api.themoviedb.org/3";
const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list`;

// Cache for genres
let genresCache: Genre[] | null = null;

const createAuthHeaders = (bearerToken?: string) => {
  const token = bearerToken || BEARER_TOKEN;
  return {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const fetchGenres = async (bearerToken?: string): Promise<Genre[]> => {
  if (genresCache) {
    return genresCache;
  }

  try {
    const response = await fetch(`${GENRE_LIST_URL}?language=en-US`, {
      method: "GET",
      headers: createAuthHeaders(bearerToken),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch genres: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    genresCache = data?.genres || [];
    return genresCache || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
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

export const searchMovies = async ({
  query,
  page = 1,
  bearerToken, // Optional bearer token parameter
}: MovieSearchParams & {
  bearerToken?: string;
}): Promise<MovieSearchResponse> => {
  const endpoint = query
    ? `${BASE_URL}/search/movie`
    : `${BASE_URL}/movie/popular`;

  // Build URL with query parameters
  const url = new URL(endpoint);
  url.searchParams.append("language", "en-US");
  url.searchParams.append("page", page.toString());

  if (query) {
    url.searchParams.append("query", query);
  }

  try {
    // Fetch movies and genres concurrently
    const [moviesResponse, genres] = await Promise.all([
      fetch(url.toString(), {
        method: "GET",
        headers: createAuthHeaders(bearerToken),
      }),
      fetchGenres(bearerToken),
    ]);

    if (!moviesResponse.ok) {
      throw new Error(
        `Failed to fetch movies: ${moviesResponse.status} ${moviesResponse.statusText}`
      );
    }

    const moviesData: MovieSearchResponse = await moviesResponse.json();

    // Map genres to movies
    const moviesWithGenres = mapGenresToMovies(moviesData.results, genres);

    return {
      ...moviesData,
      results: moviesWithGenres,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
