import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      const res = await forgotPassword({ email });
      setMessage("Password reset instructions have been sent to your email.");
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {loading && <Loader />}
      <h2 className="text-primary text-xl sm:text-2xl mb-4 text-center">Forgot Password</h2>
      <p className="text-secondary mb-6 text-sm sm:text-base text-center">
        Enter your email address and we'll send you instructions to reset your password.
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button 
          type="submit"
          className="w-full bg-primary text-white px-4 py-3 rounded-md mt-2 text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Instructions"}
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

export default ForgotPassword;
