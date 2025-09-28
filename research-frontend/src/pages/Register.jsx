import { useState } from "react";
import { register } from "../api/auth";
import Loader from "../components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");
    setLoading(true);
    try {
      await register({ username, email, password, confirmPassword });
      alert("Registration successful! Check email to verify.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {loading && <Loader />}
      <h2 className="text-primary text-xl sm:text-2xl mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-secondary rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button className="w-full bg-primary text-white px-4 py-3 rounded-md mt-2 text-sm sm:text-base hover:bg-blue-700 transition-colors">Register</button>
      </form>
    </div>
  );
};

export default Register;
