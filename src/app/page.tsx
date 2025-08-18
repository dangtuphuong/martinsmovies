"use client";

import { useEffect, useState, useCallback } from "react";
import { Movie } from "@/types/movie";
import { searchMovies } from "@/services/movieApi";
import { MovieCard } from "@/components/MovieCard";
import { useWatchedMovies } from "@/hooks/useWatchedMovies";
import { useDebounce } from "@/hooks/useDebounce";

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Jumbotron */}
      <div
        className="w-full text-white py-12 mb-2 shadow-lg"
        style={{
          background:
            "linear-gradient(rgba(161,31,60,0.9) 0%, rgba(147,82,179,0.9) 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="text-xl font-bold mb-2">Movie Grid 1</h1>
          <p className="text-lg">Home | Movie Grid 1</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        ) : (
          <>
            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isWatched={isWatched(movie.id)}
                  onToggleWatched={() => toggleWatched(movie.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
