export const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
export const BASE_URL = "https://api.themoviedb.org/3";

export const createRequestOptions = () => {
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
