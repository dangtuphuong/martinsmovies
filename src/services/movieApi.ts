import { MovieSearchParams, MovieSearchResponse } from "@/types/movie";

const BASE_URL = "/api/movies";

const handleApiResponse = async (
  response: Response
): Promise<MovieSearchResponse> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};

export const searchMovies = async ({
  query,
  page = 1,
}: MovieSearchParams): Promise<MovieSearchResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(query && { query }),
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  return handleApiResponse(response);
};
