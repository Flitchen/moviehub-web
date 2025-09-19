# Movie Website Application

A modern movie browsing application built with React, TypeScript, and Vite. This application allows users to discover movies, view detailed information, manage a personal watchlist, and customize their experience through various settings.

## Features

- **Dashboard:**
  - User-specific data: Number of movies in watchlist.
  - Personalized recommendations based on watchlist.
  - Basic visualizations: Charts for movie genres and release trends.
  - Table of the latest 5 movies (sortable by release date, popularity).
  - "View More" button to browse all recent movies.
- **Movies Page:**
  - Browse and discover movies.
  - Search functionality by movie title.
  - Filter movies by genre, release year, and rating.
  - Pagination for navigating through movie results.
  - Add movies to watchlist directly from movie cards.
- **Movie Details Page:**
  - Comprehensive movie information: backdrop, poster, title, overview, genres, release date, rating, runtime.
  - Cast and crew details.
  - Similar movie recommendations.
  - Add/Remove movie from watchlist.
- **Watchlist Page:**
  - View all movies added to the personal watchlist.
  - Remove movies from the watchlist.
- **Settings Page:**
  - Customize application theme (dark/light mode).
  - Manage notification preferences.
  - Option to clear the entire watchlist.
  - Display user statistics (movies browsed, ratings given, join date).
- **Toast Notifications:**
  - Provides user feedback for actions like adding/removing movies from the watchlist.

## Technologies Used

- **Frontend:**
  - React (with TypeScript)
  - Vite
  - React Router DOM
  - Redux Toolkit (for state management)
  - Tailwind CSS (for styling)
  - Recharts (for data visualization)
  - React Hot Toast (for notifications)
  - React Icons (for icons)
- **API:**
  - The Movie Database (TMDB) API

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Flitchen/moviehub-web
    cd moviehub-web
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

- `VITE_TMDB_API_KEY`: Get your API key from [TMDB](https://www.themoviedb.org/documentation/api).
- `VITE_CLERK_PUBLISHABLE_KEY`: Get your publishable key from [Clerk](https://clerk.com/).

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` (or the port displayed in your terminal).

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   └── MovieCard.tsx
│   │   └── dashboard/
│   │       ├── GenresChart.tsx
│   │       ├── MoviesTable.tsx
│   │       ├── Recommendations.tsx
│   │       ├── ReleaseTrendChart.tsx
│   │       └── SummaryCard.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MovieDetails.tsx
│   │   ├── Movies.tsx
│   │   ├── Settings.tsx
│   │   └── Watchlist.tsx
│   ├── services/
│   │   └── api/
│   │       ├── client.ts
│   │       └── movies.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── movieSlice.ts
│   │   ├── store.ts
│   │   ├── userSlice.ts
│   │   └── watchlistSlice.ts
│   ├── types/
│   │   └── Movie.ts
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── router.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

[MIT License](LICENSE) - _You might need to create a LICENSE file if it doesn't exist._
