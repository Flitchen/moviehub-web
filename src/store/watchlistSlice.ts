import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

interface WatchlistState {
  items: Movie[];
  isLoading: boolean;
}

const initialState: WatchlistState = {
  items: [],
  isLoading: false,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWatchlist: (state) => {
      state.items = [];
    },
    setWatchlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
  setWatchlistLoading,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;

// Selectors
export const selectWatchlist = (state: { watchlist: WatchlistState }) =>
  state.watchlist.items;
export const selectIsInWatchlist = (
  state: { watchlist: WatchlistState },
  movieId: number
) => state.watchlist.items.some((item) => item.id === movieId);
export const selectWatchlistCount = (state: { watchlist: WatchlistState }) =>
  state.watchlist.items.length;
