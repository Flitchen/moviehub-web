import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesApi } from "../services/api/movies";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../store/watchlistSlice";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";
import MovieCard from "../components/common/MovieCard";
import Loader from "../components/common/Loader";

export interface Movie {
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

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface MovieDetailsType extends Movie {
  runtime: number | null;
  genres: Genre[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: Collection | null;
}

export interface Cast {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [credits, setCredits] = useState<{ cast: Cast[]; crew: Crew[] } | null>(
    null
  );
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const isInWatchlist = movie
    ? watchlist.some((item) => item.id === movie.id)
    : false;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        try {
          const movieDetails = await moviesApi.getMovieDetails(parseInt(id));
          setMovie(movieDetails);
          const movieCredits = await moviesApi.getMovieCredits(parseInt(id));
          setCredits(movieCredits);
          const similar = await moviesApi.getSimilarMovies(parseInt(id));
          setSimilarMovies(similar.results);
          //scroll to top  after new page loads
          window.scrollTo(0, 0);
        } catch (error) {
          toast.error("Error fetching movie details");

          console.error("Error fetching movie details:", error);
        }
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleToggleWatchlist = () => {
    if (!movie) return;
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
      toast.success(`${movie.title} has been removed from your watchlist.`);
    } else {
      dispatch(addToWatchlist(movie));
      toast.success(`${movie.title} has been added to your watchlist.`);
    }
  };

  if (!movie) {
    return <Loader />;
  }

  return (
    <div>
      <div className="relative h-96">
        <img
          src={moviesApi.getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-dark-950/90 z-10" />
      </div>
      <div className="p-6">
        <div className="flex -mt-32">
          <img
            src={moviesApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-48 h-auto rounded-lg shadow-lg z-20"
          />
          <div className="ml-6 mt-32">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center text-gray-400 mt-2 text-sm">
              <span>{movie.release_date}</span>
              <span className="mx-2">•</span>
              <span>{movie.genres.map((g) => g.name).join(", ")}</span>
              <span className="mx-2">•</span>
              <span>{movie.runtime} min</span>
            </div>

            {/* Rating + Watchlist */}
            <div className="flex items-center mt-6 space-x-6">
              {/* Rating block */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                {/* Stars */}
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => {
                    const fullStar = i < Math.floor(movie.vote_average / 2);
                    const halfStar =
                      i === Math.floor(movie.vote_average / 2) &&
                      movie.vote_average % 2 >= 1;
                    return (
                      <span key={i}>
                        {fullStar ? "★" : halfStar ? "☆" : "☆"}
                      </span>
                    );
                  })}
                </div>
                {/* Numeric rating */}
                <span className="text-lg font-semibold text-white">
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>

              {/* Watchlist button */}
              <button
                onClick={handleToggleWatchlist}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  isInWatchlist
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary-500 hover:bg-primary-600"
                } text-white`}
              >
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white">Overview</h2>
          <p className="text-gray-300 mt-2">{movie.overview}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-2">
            {credits?.cast.slice(0, 8).map((person) => (
              <div key={person.id} className="text-center">
                <img
                  src={moviesApi.getImageUrl(person.profile_path, "w185")}
                  alt={person.name}
                  className="w-full h-auto rounded-full"
                />
                <p className="text-white mt-2">{person.name}</p>
                <p className="text-gray-400 text-sm">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white">Similar Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-2">
            {similarMovies.slice(0, 5).map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
