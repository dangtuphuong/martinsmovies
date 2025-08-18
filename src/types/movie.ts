export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  imdb_id?: string;
  genre_ids: number[];
  genres?: Genre[]; // add by the genre mapping
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieSearchParams {
  query?: string;
  page?: number;
}

export interface Genre {
  id: number;
  name: string;
}
