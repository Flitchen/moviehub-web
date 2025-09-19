import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { moviesApi } from "../../services/api/movies";
import toast from "react-hot-toast";
import CustomToolTip from "./CustomToolTip";
// import { Movie } from '../../types/Movie';

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

const ReleaseTrendChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await moviesApi.getPopular(1);
        const movies = response.results;
        const releaseYears = movies.map((movie) =>
          new Date(movie.release_date).getFullYear()
        );
        const yearCounts = releaseYears.reduce(
          (acc, year) => {
            acc[year] = (acc[year] || 0) + 1;
            return acc;
          },
          {} as Record<number, number>
        );

        const chartData = Object.keys(yearCounts)
          .map((year) => ({
            year: parseInt(year),
            movies: yearCounts[parseInt(year)],
          }))
          .sort((a, b) => a.year - b.year);

        setData(chartData);
      } catch (error) {
        toast.error("Error fetching movie data");

        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Movie Release Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomToolTip />} />
          <Legend />
          <Line type="monotone" dataKey="movies" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReleaseTrendChart;
