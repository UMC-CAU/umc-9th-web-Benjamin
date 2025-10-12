import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PopularPage() {
  const { movies, isLoading, error, page, totalPages, setPage } = useMovies('/movie/popular');

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center">에러: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">인기 영화</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <span className="mx-4">
          {page} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>
    </div>
  );
}
