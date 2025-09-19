import React from 'react';
import { Link } from 'react-router-dom';
import { moviesApi } from '../../services/api/movies';
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../../store/watchlistSlice';
import toast from 'react-hot-toast';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

interface MoviesTableProps {
  movies: Movie[];
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies }) => {
  const dispatch = useDispatch();

  const handleAddToWatchlist = (movie: Movie) => {
    dispatch(addToWatchlist(movie));
    toast.success(`${movie.title} has been added to your watchlist.`);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Latest Movies</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="p-2">Poster</th>
            <th className="p-2">Title</th>
            <th className="p-2">Release Date</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="border-b border-gray-700">
              <td className="p-2">
                <img
                  src={moviesApi.getImageUrl(movie.poster_path, 'w92')}
                  alt={movie.title}
                  className="w-12 h-auto rounded-md"
                />
              </td>
              <td className="p-2">{movie.title}</td>
              <td className="p-2">{movie.release_date}</td>
              <td className="p-2">{movie.vote_average.toFixed(1)}</td>
              <td className="p-2">
                <button 
                  onClick={() => handleAddToWatchlist(movie)}
                  className="bg-primary-500 text-white p-2 rounded-md"
                >
                  Add to Watchlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <Link to="/movies" className="text-primary-500 hover:underline">
          View More
        </Link>
      </div>
    </div>
  );
};

export default MoviesTable;
