import React from "react";

export default function FilterPanel({
  searchTerm,
  setSearchTerm,
  genres,
  genre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
  sort,
  setSort,
  setPage,
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />

        {/* Genre */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Year */}
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />

        {/* Rating */}
        <input
          type="number"
          placeholder="⭐ Min Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          <option value="">Sort By</option>
          <option value="release_date.desc">Release Date (Newest)</option>
          <option value="release_date.asc">Release Date (Oldest)</option>
          <option value="vote_average.desc">Rating (High → Low)</option>
          <option value="vote_average.asc">Rating (Low → High)</option>
          <option value="popularity.desc">Popularity (Most Popular)</option>
          <option value="popularity.asc">Popularity (Least Popular)</option>
        </select>

        {/* Clear All Button */}
        <button
          onClick={() => {
            setSearchTerm("");
            setGenre("");
            setYear("");
            setRating("");
            setSort("");
            setPage(1); // reset to first page
          }}
          className="w-full bg-primary-500 text-white font-semibold px-4 py-2 rounded-lg 
           hover:bg-primary-600 transition"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
