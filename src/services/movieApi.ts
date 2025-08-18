import { MovieSearchParams, MovieSearchResponse } from "@/types/movie";

const API_KEY = "4f87f4e7c40b7e2be7948c3b9b94865f";
const BASE_URL = "https://api.themoviedb.org/3";

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

  const response = await fetch(`${endpoint}?${searchParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};
