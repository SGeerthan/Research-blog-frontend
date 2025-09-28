import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Campus Blog</Link>
      <div className="space-x-4">
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
