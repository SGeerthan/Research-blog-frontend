import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import Loader from "../components/Loader";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("sessionStart", String(Date.now()));
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {loading && <Loader />}
      <h2 className="text-primary text-xl sm:text-2xl mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button className="w-full bg-primary text-white px-4 py-3 rounded-md mt-2 text-sm sm:text-base hover:bg-blue-700 transition-colors">Login</button>
      </form>
      <div className="mt-4 text-center">
        <Link 
          to="/forgot-password" 
          className="text-accent hover:text-primary underline text-sm"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
