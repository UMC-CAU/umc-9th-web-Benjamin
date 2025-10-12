import { Link } from 'react-router-dom';
import type { Movie } from '../movie-type';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group relative rounded-lg overflow-hidden cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover transition-transform transition-filter duration-300 ease-in-out group-hover:blur-sm group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
          <div className="max-h-[80%] overflow-y-auto">
            <p className="text-sm text-gray-200">{movie.overview}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}