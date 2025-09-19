import apiClient from './client'

// Types
interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface Collection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

interface MovieDetails extends Movie {
  runtime: number | null
  genres: Genre[]
  budget: number
  revenue: number
  status: string
  tagline: string | null
  homepage: string | null
  imdb_id: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  belongs_to_collection: Collection | null
}

interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface FilterParams {
  with_genres?: string
  primary_release_year?: string
  'vote_average.gte'?: string
  sort_by?: string
  page?: number
}

interface Cast {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

interface Crew {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export const moviesApi = {
  // Get trending movies
  getTrending: async (timeWindow: 'day' | 'week' = 'day'): Promise<MoviesResponse> => {
    const response = await apiClient.get(`/trending/movie/${timeWindow}`)
    return response.data
  },

  // Get popular movies
  getPopular: async (page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get('/movie/popular', {
      params: { page }
    })
    return response.data
  },

  // Get top rated movies
  getTopRated: async (page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get('/movie/top_rated', {
      params: { page }
    })
    return response.data
  },

  // Get now playing movies
  getNowPlaying: async (page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get('/movie/now_playing', {
      params: { page }
    })
    return response.data
  },

  // Get upcoming movies
  getUpcoming: async (page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get('/movie/upcoming', {
      params: { page }
    })
    return response.data
  },

  // Search movies
  searchMovies: async (query: string, page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get('/search/movie', {
      params: { query, page, include_adult: false }
    })
    return response.data
  },

  // Discover movies with filters
  discoverMovies: async (filters: FilterParams): Promise<MoviesResponse> => {
    const response = await apiClient.get('/discover/movie', {
      params: {
        include_adult: false,
        include_video: false,
        language: 'en-US',
        ...filters
      }
    })
    return response.data
  },

  // Get movie details
  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await apiClient.get(`/movie/${id}`)
    return response.data
  },

  // Get movie credits (cast and crew)
  getMovieCredits: async (id: number): Promise<Credits> => {
    const response = await apiClient.get(`/movie/${id}/credits`)
    return response.data
  },

  // Get similar movies
  getSimilarMovies: async (id: number, page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get(`/movie/${id}/similar`, {
      params: { page }
    })
    return response.data
  },

  // Get movie recommendations
  getRecommendations: async (id: number, page = 1): Promise<MoviesResponse> => {
    const response = await apiClient.get(`/movie/${id}/recommendations`, {
      params: { page }
    })
    return response.data
  },

  // Get movie genres list
  getGenres: async (): Promise<{ genres: Genre[] }> => {
    const response = await apiClient.get('/genre/movie/list')
    return response.data
  },

  // Helper function to get full image URL
  getImageUrl: (path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return '/placeholder-poster.jpg'
    return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`
  },

  // Helper function to get backdrop image URL
  getBackdropUrl: (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
    if (!path) return '/placeholder-backdrop.jpg'
    return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`
  }
}
