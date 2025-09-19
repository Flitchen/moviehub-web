import { Link, useLocation } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiFilm,
  FiBookmark,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { cn } from "../../utils/cn";

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Movies", href: "/movies", icon: FiFilm },
    { name: "Watchlist", href: "/watchlist", icon: FiBookmark },
    { name: "Settings", href: "/settings", icon: FiSettings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FiFilm className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Movie Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "text-primary-400"
                        : "text-dark-300 hover:text-white"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute inset-0 bg-primary-500/20 rounded-lg"
                        layoutId="activeTab"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Profile & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className="text-sm text-dark-300">
                  Welcome, {user?.firstName || "User"}
                </span>
              </div>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard:
                      "glass-morphism border border-white/10",
                  },
                }}
              />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiMenu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-16 w-full z-40 glass-morphism border-b border-white/10 overflow-hidden"
      >
        <div className="px-4 py-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-primary-400 bg-primary-500/20"
                    : "text-dark-300 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Header;
