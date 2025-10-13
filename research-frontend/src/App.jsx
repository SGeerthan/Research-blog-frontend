import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Loader from "./components/Loader";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const SESSION_MAX_MS = useMemo(() => 1000 * 60 * 60 * 2, []); // 2 hours
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionStart");
    setToken("");
  };

  const isSessionValid = () => {
    const start = Number(localStorage.getItem("sessionStart") || 0);
    if (!start) return false;
    return Date.now() - start < SESSION_MAX_MS;
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (token && !isSessionValid()) {
        handleLogout();
      }
    }, 60 * 1000);
    return () => clearInterval(id);
  }, [token, SESSION_MAX_MS]);

  const ProtectedRoute = ({ children }) => {
    if (!token || !isSessionValid()) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      {loading && <Loader />}

      <nav className="bg-primary text-white px-4 sm:px-6 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-lg sm:text-xl">CampusBlog</Link>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <Link to="/" className="text-sm sm:text-base hover:text-gray-200">Home</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-sm sm:text-base hover:text-gray-200">Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded text-sm sm:text-base hover:bg-red-700 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm sm:text-base hover:text-gray-200">Login</Link>
                <Link to="/register" className="bg-accent px-3 py-1 rounded text-sm sm:text-base hover:bg-green-600 transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-4 sm:mt-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-post"
            element={
              <ProtectedRoute>
                <CreatePost token={token} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
