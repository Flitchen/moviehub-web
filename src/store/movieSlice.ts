import { createSlice } from "@reduxjs/toolkit";

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

interface FilterState {
  genre: string;
  year: string;
  rating: string;
  sortBy: string;
}

interface MovieState {
  movies: Movie[];
  trendingMovies: Movie[];
  searchQuery: string;
  filters: FilterState;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  trendingMovies: [],
  searchQuery: "",
  filters: {
    genre: "",
    year: "",
    rating: "",
    sortBy: "popularity.desc",
  },
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setTrendingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.trendingMovies = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset page when search changes
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset page when filters change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
      state.searchQuery = "";
    },
  },
});

export const {
  setMovies,
  setTrendingMovies,
  setSearchQuery,
  setFilters,
  setCurrentPage,
  setTotalPages,
  setTotalResults,
  setLoading,
  setError,
  clearError,
  resetFilters,
} = movieSlice.actions;

export default movieSlice.reducer;
