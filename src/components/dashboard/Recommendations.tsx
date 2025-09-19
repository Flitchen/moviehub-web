import React, { useEffect, useState } from "react";
import { moviesApi } from "../../services/api/movies";
import MovieCard from "../common/MovieCard";
import toast from "react-hot-toast";
// import { Movie } from '../../types/Movie';

interface RecommendationsProps {
  movieId: number;
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

const Recommendations: React.FC<RecommendationsProps> = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (movieId) {
        try {
          const response = await moviesApi.getRecommendations(movieId);
          setRecommendations(response.results.slice(0, 5));
        } catch (error) {
          toast.error("Error fetching recommendations");
          console.error("Error fetching recommendations:", error);
        }
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {recommendations.map((movie, index) => (
          // <div key={movie.id} className="text-center">
          //   <img
          //     src={moviesApi.getImageUrl(movie.poster_path, "w185")}
          //     alt={movie.title}
          //     className="w-full h-auto rounded-md"
          //   />
          //   <p className="mt-2">{movie.title}</p>
          // </div>
          <MovieCard
            key={movie.id}
            movie={movie}
            index={index}
            showRatings={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
