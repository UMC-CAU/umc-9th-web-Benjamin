import { useState, useEffect } from 'react';
import type { Movie } from '../movie-type';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
}

export function useMovies(endpoint: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}${endpoint}?language=ko-KR&page=${page}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data: MovieApiResponse = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (endpoint) {
      fetchMovies();
    }
  }, [endpoint, page]);

  return { movies, isLoading, error, page, totalPages, setPage };
}
