import React from "react";
import { Link } from "react-router-dom";
import { moviesApi } from "../../services/api/movies";
import { formatRating, formatYear } from "../../utils/formatters";
import { FiPlay, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
}
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
const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  showRatings = true,
  index = 0,
}) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="group card-hover bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={moviesApi.getImageUrl(movie.poster_path, "w342")}
            alt={movie.title}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center">
              <FiPlay className="w-12 h-12 text-primary-400 mx-auto mb-2" />
              <p className="text-white font-semibold">View Details</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-white truncate">
            {movie.title}
          </h2>

          {showRatings && (
            <div className="flex items-center justify-between text-sm text-dark-300 py-2">
              <span>{formatYear(movie.release_date)}</span>
              <div className="flex items-center space-x-1">
                <FiStar className="w-4 h-4 text-yellow-400" />
                <span>{formatRating(movie.vote_average)}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;
