import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);
  
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await resetPassword(token, { password });
      setMessage("Password has been reset successfully. You can now login with your new password.");
      setLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. The token may be expired or invalid.");
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="form-container">
        <h2 className="text-primary text-xl sm:text-2xl mb-4 text-center">Invalid Reset Link</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
          {error}
        </div>
        <div className="text-center">
          <Link 
            to="/forgot-password" 
            className="text-accent hover:text-primary underline text-sm sm:text-base"
          >
            Request a new password reset
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      {loading && <Loader />}
      <h2 className="text-primary text-xl sm:text-2xl mb-4 text-center">Reset Password</h2>
      <p className="text-secondary mb-6 text-sm sm:text-base text-center">
        Enter your new password below.
      </p>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
          {message}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
          minLength={6}
        />
        <button 
          type="submit"
          className="w-full bg-primary text-white px-4 py-3 rounded-md mt-2 text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link 
          to="/login" 
          className="text-accent hover:text-primary underline text-sm"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
