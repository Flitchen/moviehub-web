import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiTrendingUp,
  FiStar,
  FiUsers,
  FiFilm,
  FiArrowRight,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";

// API
import { moviesApi } from "../services/api/movies";

// Types
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

// Utils
import { formatYear, formatRating } from "../utils/formatters";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await moviesApi.getTrending();
        setTrendingMovies(response.results.slice(0, 10));
      } catch (error) {
        toast.error("Error fetching trending movies");
        console.error("Error fetching trending movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.max(1, trendingMovies.length - 4)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, trendingMovies.length - 4)) %
        Math.max(1, trendingMovies.length - 4)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-dark-950/90 z-10" />
          <img
            src={
              trendingMovies[0]
                ? moviesApi.getBackdropUrl(
                    trendingMovies[0].backdrop_path,
                    "original"
                  )
                : "/hero-bg.jpg"
            }
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Discover</span>
            <br />
            <span className="text-white">Your Next Favorite</span>
            <br />
            <span className="text-primary-400">Movie</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-dark-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Explore thousands of movies, create personalized watchlists, and
            discover trending content from around the world.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {isSignedIn ? (
              <Link
                to="/dashboard"
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <FiPlay className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <FiPlay className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
                <Link
                  to="/sign-in"
                  className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Sign In</span>
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                50K+
              </div>
              <div className="text-dark-300">Movies Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                10K+
              </div>
              <div className="text-dark-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                4.8
              </div>
              <div className="text-dark-300">User Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 p-4 glass-morphism rounded-full"
        >
          <FiTrendingUp className="w-8 h-8 text-primary-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-16 p-4 glass-morphism rounded-full"
        >
          <FiStar className="w-8 h-8 text-yellow-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-20 p-4 glass-morphism rounded-full"
        >
          <FiUsers className="w-8 h-8 text-green-400" />
        </motion.div>
      </section>

      {/* Trending Movies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trending <span className="text-primary-400">Now</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Discover what everyone is watching this week
            </p>
          </motion.div>

          {!isLoading && trendingMovies.length > 0 && (
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 glass-morphism rounded-full hover:bg-white/20 transition-all"
              >
                <FiChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 glass-morphism rounded-full hover:bg-white/20 transition-all"
              >
                <FiChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Movies Carousel */}
              <div className="overflow-hidden mx-12">
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                  {trendingMovies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="w-1/4 flex-shrink-0 px-3"
                    >
                      <Link to={`/movies/${movie.id}`}>
                        <div className="group card-hover bg-dark-900 rounded-xl overflow-hidden">
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                              src={moviesApi.getImageUrl(movie.poster_path)}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-center">
                                <FiPlay className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                                <p className="text-white font-semibold">
                                  View Details
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-white mb-2 truncate">
                              {movie.title}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-dark-300">
                              <span>{formatYear(movie.release_date)}</span>
                              <div className="flex items-center space-x-1">
                                <FiStar className="w-4 h-4 text-yellow-400" />
                                <span>{formatRating(movie.vote_average)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[2/3] bg-dark-800 rounded-xl mb-4" />
                    <div className="h-4 bg-dark-800 rounded mb-2" />
                    <div className="h-3 bg-dark-800 rounded w-2/3" />
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-primary-400">Movie Hub</span>?
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Experience the future of movie discovery with our powerful
              features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-morphism rounded-xl"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiFilm className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Vast Library
              </h3>
              <p className="text-dark-300 leading-relaxed">
                Access thousands of movies from different genres, languages, and
                decades. From blockbusters to indie gems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-morphism rounded-xl"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiStar className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Smart Recommendations
              </h3>
              <p className="text-dark-300 leading-relaxed">
                Get personalized movie suggestions based on your viewing history
                and preferences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-morphism rounded-xl"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUsers className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Community Driven
              </h3>
              <p className="text-dark-300 leading-relaxed">
                Join a community of movie lovers. Share reviews, create lists,
                and discover through social curation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isSignedIn && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your{" "}
                <span className="text-primary-400">Journey</span>?
              </h2>
              <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
                Join thousands of movie enthusiasts and start discovering your
                next favorite film today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/sign-up"
                  className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <FiPlay className="w-5 h-5" />
                  <span>Start Free Trial</span>
                </Link>
                <Link
                  to="/sign-in"
                  className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Sign In</span>
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <FiFilm className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Movie Hub</span>
          </div>
          <p className="text-dark-400 mb-4">
            Discover, organize, and enjoy movies like never before.
          </p>
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} Movie Hub. All rights reserved.
            Powered by TMDb.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
