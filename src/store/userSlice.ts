import { createSlice } from "@reduxjs/toolkit";

interface UserPreferences {
  theme: "dark" | "light";
  preferredGenres: string[];
  language: string;
  notifications: boolean;
}

interface UserStats {
  moviesBrowsed: number;
  totalWatchTime: number; // in minutes
  favoriteGenres: { [key: string]: number };
  ratingsGiven: number;
  joinDate: string;
}

interface UserState {
  preferences: UserPreferences;
  stats: UserStats;
  isLoading: boolean;
}

const initialState: UserState = {
  preferences: {
    theme: "dark",
    preferredGenres: [],
    language: "en",
    notifications: true,
  },
  stats: {
    moviesBrowsed: 0,
    totalWatchTime: 0,
    favoriteGenres: {},
    ratingsGiven: 0,
    joinDate: new Date().toISOString(),
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserPreferences: (
      state,
      action: PayloadAction<Partial<UserPreferences>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateStats: (state, action: PayloadAction<Partial<UserStats>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    incrementMoviesBrowsed: (state) => {
      state.stats.moviesBrowsed += 1;
    },
    addToFavoriteGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      state.stats.favoriteGenres[genre] =
        (state.stats.favoriteGenres[genre] || 0) + 1;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetUserData: (state) => {
      state.preferences = initialState.preferences;
      state.stats = {
        ...initialState.stats,
        joinDate: new Date().toISOString(),
      };
    },
  },
});

export const {
  setUserPreferences,
  updateStats,
  incrementMoviesBrowsed,
  addToFavoriteGenre,
  setUserLoading,
  resetUserData,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUserPreferences = (state: { user: UserState }) =>
  state.user.preferences;
export const selectUserStats = (state: { user: UserState }) => state.user.stats;
