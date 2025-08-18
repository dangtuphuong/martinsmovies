import {
  MovieSearchParams,
  MovieSearchResponse,
  Movie,
  Genre,
} from "@/types/movie";

const API_KEY = "4f87f4e7c40b7e2be7948c3b9b94865f";
const BASE_URL = "https://api.themoviedb.org/3";
const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list`;

// Cache for genres to avoid repeated API calls
let genresCache: Genre[] | null = null;

const fetchGenres = async (): Promise<Genre[]> => {
  if (genresCache) {
    return genresCache;
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY || "",
  });

  const response = await fetch(`${GENRE_LIST_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await response.json();
  genresCache = data?.genres;
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

export const searchMovies = async ({
  query,
  page = 1,
}: MovieSearchParams): Promise<MovieSearchResponse> => {
  const endpoint = query
    ? `${BASE_URL}/search/movie`
    : `${BASE_URL}/movie/popular`;

  const searchParams = new URLSearchParams({
    api_key: API_KEY || "",
    page: page.toString(),
    ...(query && { query }),
  });

  // Fetch movies and genres concurrently
  const [moviesResponse, genres] = await Promise.all([
    fetch(`${endpoint}?${searchParams}`),
    fetchGenres(),
  ]);

  if (!moviesResponse.ok) {
    throw new Error("Failed to fetch movies");
  }

  const moviesData: MovieSearchResponse = await moviesResponse.json();

  // Map genres to movies
  const moviesWithGenres = mapGenresToMovies(moviesData.results, genres);

  return {
    ...moviesData,
    results: moviesWithGenres,
  };
};
