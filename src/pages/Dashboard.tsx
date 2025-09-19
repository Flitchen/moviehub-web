import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { moviesApi } from "../services/api/movies";
import SummaryCard from "../components/dashboard/SummaryCard";
import MoviesTable from "../components/dashboard/MoviesTable";
import GenresChart from "../components/dashboard/GenresChart";
import Recommendations from "../components/dashboard/Recommendations";
import ReleaseTrendChart from "../components/dashboard/ReleaseTrendChart";
import { FaFilm, FaStar, FaPoll, FaList } from "react-icons/fa";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<any>(null);
  const [topRatedMovies, setTopRatedMovies] = useState<any>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const lastAddedMovie =
    watchlist.length > 0 ? watchlist[watchlist.length - 1] : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popular = await moviesApi.getPopular();
        setPopularMovies(popular);
        const topRated = await moviesApi.getTopRated();
        setTopRatedMovies(topRated);
        const genresData = await moviesApi.getGenres();
        // For the chart, we need to simulate the number of movies per genre
        const genresWithMovies = genresData.genres.map((genre) => ({
          ...genre,
          movies: Math.floor(Math.random() * 1000) + 100,
        }));
        setGenres(genresWithMovies);
      } catch (error) {
        toast.error("Error fetching data");

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <SummaryCard
          title="Popular Movies"
          value={popularMovies ? popularMovies.total_results : "Loading..."}
          icon={<FaFilm className="text-4xl text-primary-500" />}
        />
        <SummaryCard
          title="Top Rated Movies"
          value={topRatedMovies ? topRatedMovies.total_results : "Loading..."}
          icon={<FaStar className="text-4xl text-yellow-500" />}
        />
        <SummaryCard
          title="Total Genres"
          value={genres ? genres.length : "Loading..."}
          icon={<FaPoll className="text-4xl text-green-500" />}
        />
        <SummaryCard
          title="Watchlist"
          value={watchlist.length}
          icon={<FaList className="text-4xl text-red-500" />}
        />
      </div>
      {lastAddedMovie && (
        <div className="mb-4">
          <Recommendations movieId={lastAddedMovie.id} />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>{genres.length > 0 && <GenresChart genres={genres} />}</div>
        <div>
          <ReleaseTrendChart />
        </div>
      </div>
      <div>
        {popularMovies && (
          <MoviesTable movies={popularMovies.results.slice(0, 5)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
