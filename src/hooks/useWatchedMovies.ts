import { useEffect, useState } from 'react';

export const useWatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('watchedMovies');
    if (stored) {
      setWatchedMovies(new Set(JSON.parse(stored)));
    }
  }, []);

  const toggleWatched = (movieId: number) => {
    setWatchedMovies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      localStorage.setItem('watchedMovies', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const isWatched = (movieId: number) => watchedMovies.has(movieId);

  return { watchedMovies, toggleWatched, isWatched };
}
