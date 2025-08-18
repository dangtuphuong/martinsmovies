"use client";

import { useEffect, useState, useCallback } from "react";
import { Movie } from "@/types/movie";
import { searchMovies } from "@/services/movieApi";
import { MovieCard } from "@/components/MovieCard";
import { useWatchedMovies } from "@/hooks/useWatchedMovies";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "./page.module.css";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { isWatched, toggleWatched } = useWatchedMovies();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await searchMovies({ query: debouncedSearchQuery, page });
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchQuery]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <div className={styles.grid}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isWatched={isWatched(movie.id)}
                onToggleWatched={() => toggleWatched(movie.id)}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
