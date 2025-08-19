"use client";

import { useEffect, useState, useCallback } from "react";
import { Movie } from "@/types/movie";
import { searchMovies } from "@/services/movies";
import { fetchImdbIds } from "@/services/imdbs";
import { MovieCard } from "@/app/components/MovieCard";
import ViewSwitcher from "@/app/components/SwitchView";
import { Pagination } from "@/app/components/Pagination";
import { useWatchedMovies } from "@/hooks/useWatchedMovies";
import { useDebounce } from "@/hooks/useDebounce";

const SKELETON_COUNT = 3;

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

      // 1. Fetch movies
      const data = await searchMovies({ query: debouncedSearchQuery, page });
      setMovies(data.results); // display immediately
      setTotalPages(data.total_pages);
      setLoading(false);

      // 2. Fetch IMDb IDs in the background
      const movieIds = data.results.map((m) => m.id);
      if (movieIds.length > 0) {
        fetchImdbIds(movieIds)
          .then((imdbResults) => {
            setMovies((prevMovies) =>
              prevMovies.map((movie) => {
                const imdb = imdbResults.find((i) => i.id === movie.id);
                return { ...movie, imdb_id: imdb?.imdb_id ?? undefined };
              })
            );
          })
          .catch((imdbErr) => {
            console.warn("Failed to fetch IMDb IDs:", imdbErr);
          });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
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

  return (
    <main>
      {/* Jumbotron */}
      <div
        className="w-full text-white py-13 shadow-lg overlay-gradient"
        style={{
          background: `
            linear-gradient(rgba(161,31,60,0.85), rgba(147,82,179,0.85)),
            url(/images/jumbotron.jpg)
          `,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl mb-2">Movie Grid 3</h1>
          <p className="text-lg flex items-center gap-4">
            <span>Home</span>
            <span>|</span>
            <span className="text-gray-300">Page {page}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col w-[60%] sm:flex-row gap-4 mx-auto"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-sm focus:ring-2 focus:ring-offset-2 transition-all font-medium"
          >
            Search
          </button>
        </form>

        <ViewSwitcher />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm mb-4">
            {error}
          </div>
        )}

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse border border-gray-200 rounded-sm overflow-hidden shadow-sm"
                >
                  <div className="bg-gray-300 h-80 w-full" />
                  <div className="p-4 space-y-2 bg-white">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-15 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isWatched={isWatched(movie.id)}
                  onToggleWatched={() => toggleWatched(movie.id)}
                />
              ))}
        </div>

        {/* Pagination */}
        {!!totalPages && (
          <Pagination
            disabled={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
