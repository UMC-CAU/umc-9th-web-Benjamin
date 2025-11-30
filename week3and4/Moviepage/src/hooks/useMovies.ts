import { useState, useEffect } from 'react';
import type { Movie } from '../movie-type';
import { useCustomFetch } from './useCustomFetch';

interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
}

export function useMovies(endpoint: string) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useCustomFetch<MovieApiResponse>(endpoint, {
    params: { page },
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } else {
      setMovies([]);
    }
  }, [data]);

  return { movies, isLoading, error, page, totalPages, setPage };
}
