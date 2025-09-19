import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

interface Genre {
  id: number;
  name: string;
}

interface GenresChartProps {
  genres: Genre[];
}

const GenresChart: React.FC<GenresChartProps> = ({ genres }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Movie Genres</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={genres}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomToolTip />} />
          <Legend />
          <Bar dataKey="movies" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenresChart;
