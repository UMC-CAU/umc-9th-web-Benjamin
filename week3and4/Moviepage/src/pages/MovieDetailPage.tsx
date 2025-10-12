import { useParams } from 'react-router-dom';
import type { MovieDetail, Credits } from '../movie-type';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCustomFetch } from '../hooks/useCustomFetch';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movie, isLoading: isMovieLoading, error: movieError } = useCustomFetch<MovieDetail>(
    movieId ? `/movie/${movieId}` : null
  );
  const { data: credits, isLoading: isCreditsLoading, error: creditsError } = useCustomFetch<Credits>(
    movieId ? `/movie/${movieId}/credits` : null
  );

  const isLoading = isMovieLoading || isCreditsLoading;
  const error = movieError || creditsError;

  const posterBaseUrl = 'https://image.tmdb.org/t/p/';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <LoadingSpinner />
        <p className="ml-4 text-lg text-white">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-red-500 text-lg">정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!movie || !credits) {
    return null;
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Movie Details */}
          <div className="flex flex-col space-y-4 pr-8">
            <h1 className="text-5xl font-bold">{movie.title}</h1>
            <div className=" text-gray-400">
              <span>평균 평점⭐ {movie.vote_average.toFixed(1)}</span><br />
              <span>{releaseYear}</span><br />
              <span>{movie.runtime}분</span>
            </div>
            {movie.tagline && <h2 className="text-2xl font-semibold italic text-gray-300">{movie.tagline}</h2>}
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          {/* Right Column: Backdrop Image */}
          <div>
            <img
              src={`${posterBaseUrl}w780${movie.backdrop_path}`}
              alt={`${movie.title} backdrop`}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">감독/출연</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-8">
            {credits.cast.slice(0, 14).map((member) => (
              <div key={member.id} className="text-center">
                <img
                  src={
                    member.profile_path
                      ? `${posterBaseUrl}w185${member.profile_path}`
                      : 'https://via.placeholder.com/185x185.png?text=No+Image'
                  }
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover shadow-md mb-2"
                />
                <p className="font-semibold text-base">{member.name}</p>
                <p className="text-xs text-gray-400">{member.character} (voice)</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
