interface ImdbResponse {
  id: number;
  imdb_id: string | null;
}

export async function fetchImdbIds(
  movieIds: number[]
): Promise<ImdbResponse[]> {
  if (movieIds.length === 0) return [];

  const res = await fetch("/api/movies/imdb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieIds }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch IMDb IDs");
  }

  const data = await res.json();
  return data.results;
}
