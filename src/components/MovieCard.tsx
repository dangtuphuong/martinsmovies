import { Movie } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  isWatched: boolean;
  onToggleWatched: () => void;
}

export const MovieCard = ({
  movie,
  isWatched,
  onToggleWatched,
}: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-[650px] flex flex-col">
      <div className="relative">
        <Image
          src={posterUrl}
          alt={movie.title}
          width={300}
          height={520}
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-bold text-gray-900 mb-2 truncate"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </span>
            <span
              className="text-gray-500 text-xs truncate max-w-[200px]"
              title={movie.genres?.map((g) => g.name).join(", ")}
            >
              {movie.genres?.map((g) => g.name).join(", ")}
            </span>
          </div>
          <div className="text-gray-500 line-clamp-4">
            {movie.overview || "No description available."}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isWatched
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={onToggleWatched}
          >
            {isWatched ? "Watched" : "Mark as Watched"}
          </button>

          {movie.imdb_id ? (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium text-center"
            >
              Read More
            </a>
          ) : (
            <a
              href="#"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-not-allowed font-medium opacity-75 text-center"
            >
              Read More
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
