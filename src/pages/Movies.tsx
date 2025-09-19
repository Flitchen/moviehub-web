import React, { useState, useEffect } from "react";
import { moviesApi } from "../services/api/movies";
import MovieCard from "../components/common/MovieCard";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import FilterPanel from "../components/common/FilterPanel";

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

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await moviesApi.getGenres();
        setGenres(response.genres);
      } catch (error) {
        toast.error("Error fetching genres");
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await moviesApi.searchMovies(searchTerm, page);
        } else {
          const filters = {
            with_genres: genre,
            primary_release_year: year,
            sort_by: sort,
            "vote_average.gte": rating,
            page,
          };
          response = await moviesApi.discoverMovies(filters);
        }
        setMovies(response.results);
        setTotalPages(response.total_pages);
        //scroll to top  after new page loads
        window.scrollTo(0, 0);
      } catch (error) {
        toast.error("Failed to movies");
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [searchTerm, genre, year, sort, rating, page]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Browse Movies</h1>
      <FilterPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genres={genres}
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next ›"
          previousLabel="‹ Prev"
          onPageChange={(event) => {
            setPage(event.selected + 1);
          }}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          forcePage={page - 1} // keep UI synced with current page
          // Tailwind classes
          containerClassName="flex items-center space-x-2 text-white cursor-pointer"
          pageClassName="px-3 py-1 rounded-md bg-gray-800 hover:bg-primary-500 transition"
          activeClassName="bg-primary-500 text-white"
          previousClassName="px-3 py-1 rounded-md bg-gray-800 hover:bg-primary-500 transition"
          nextClassName="px-3 py-1 rounded-md bg-gray-800 hover:bg-primary-500 transition"
          breakClassName="px-3 py-1"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Movies;
