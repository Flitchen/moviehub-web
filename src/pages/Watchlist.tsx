import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/common/MovieCard";
import FilterPanel from "../components/common/FilterPanel";
import ReactPaginate from "react-paginate";
import { moviesApi } from "../services/api/movies";
import toast from "react-hot-toast";

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

const Watchlist: React.FC = () => {
  const watchlist = useSelector((state: RootState) => state.watchlist.items);

  // Filters
  const [movies, setMovies] = useState<Movie[]>(watchlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState<any[]>([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
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

  // Keep page in URL
  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);

  // Filter watchlist locally
  useEffect(() => {
    let filtered = [...watchlist];

    if (searchTerm) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genre) {
      filtered = filtered.filter((m) => m.genre_ids?.includes(Number(genre)));
    }

    if (year) {
      filtered = filtered.filter((m) => m.release_date?.slice(0, 4) === year);
    }

    if (rating) {
      filtered = filtered.filter((m) => m.vote_average >= Number(rating));
    }

    if (sort) {
      switch (sort) {
        case "release_date.desc":
          filtered.sort(
            (a, b) =>
              Number(b.release_date?.slice(0, 4)) -
              Number(a.release_date?.slice(0, 4))
          );
          break;
        case "release_date.asc":
          filtered.sort(
            (a, b) =>
              Number(a.release_date?.slice(0, 4)) -
              Number(b.release_date?.slice(0, 4))
          );
          break;
        case "vote_average.desc":
          filtered.sort((a, b) => b.vote_average - a.vote_average);
          break;
        case "vote_average.asc":
          filtered.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case "popularity.desc":
          filtered.sort((a, b) => b.popularity - a.popularity);
          break;
        case "popularity.asc":
          filtered.sort((a, b) => a.popularity - b.popularity);
          break;
      }
    }

    const itemsPerPage = 20;
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setMovies(filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    window.scrollTo(0, 0);
  }, [watchlist, searchTerm, genre, year, rating, sort, page]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">My Watchlist</h1>

      {watchlist.length > 0 && (
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
      )}

      {movies.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-xl">No movies found.</p>
          <p className="mt-2">
            Go to the{" "}
            <Link to="/movies" className="text-primary-500 hover:underline">
              Movies
            </Link>{" "}
            page to add some.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next ›"
              previousLabel="‹ Prev"
              onPageChange={(event) => setPage(event.selected + 1)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              forcePage={page - 1}
              containerClassName="flex items-center space-x-2 text-white cursor-pointer"
              pageClassName="px-3 py-1 rounded-md bg-gray-800 hover:bg-primary-500 transition"
              activeClassName="bg-primary-500 text-white"
              previousClassName="px-3 py-1 rounded-md bg-gray-800 hover:bg-primary-500 transition"
              nextClassName="px-3 py-1 rounded-md bg-gray-800 hover:bg-primary-500 transition"
              breakClassName="px-3 py-1"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
