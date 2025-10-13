import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const start = Number(localStorage.getItem("sessionStart") || 0);
  const maxMs = 1000 * 60 * 60 * 2; // 2 hours
  const valid = token && start && Date.now() - start < maxMs;
  if (!valid) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
