import { Movie } from "@/types/movie";
import Image from "next/image";
import styles from "./MovieCard.module.css";

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
    <div className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <Image
          src={posterUrl}
          alt={movie.title}
          width={500}
          height={750}
          className={styles.poster}
        />
        <div className={styles.overlay}>
          <button
            className={`${styles.watchedButton} ${
              isWatched ? styles.watched : ""
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
              className={styles.readMore}
            >
              Read More
            </a>
          ) : (
            <a href="#" className={styles.readMore}>
              Read More
            </a>
          )}
        </div>
      </div>
      <h3 className={styles.title}>{movie.title}</h3>
      <div className={styles.rating}>Rating: {movie.vote_average}/10</div>
    </div>
  );
}
