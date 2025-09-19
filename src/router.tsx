import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { SignIn, SignUp } from "@clerk/clerk-react";

// Pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";

// Components
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Loader from "./components/common/Loader";
import NotFound from "./pages/NotFound";

const AppRouter = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/sign-in/*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-dark-950">
            <SignIn
              routing="path"
              path="/sign-in"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "btn-primary",
                  card: "glass-morphism",
                },
              }}
            />
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-dark-950">
            <SignUp
              routing="path"
              path="/sign-up"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "btn-primary",
                  card: "glass-morphism",
                },
              }}
            />
          </div>
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Redirect authenticated users from auth pages */}
      {isSignedIn && (
        <>
          <Route
            path="/sign-in/*"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/sign-up/*"
            element={<Navigate to="/dashboard" replace />}
          />
        </>
      )}

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
