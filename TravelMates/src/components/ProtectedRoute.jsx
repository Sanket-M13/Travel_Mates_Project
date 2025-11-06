import { Navigate } from "react-router-dom";
import { getRole } from "../services/RoleService";
import { getToken } from "../services/TokenService";

export function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role not allowed → redirect to home
    return <Navigate to="/" replace />;
  }

  // Access granted
  return children;
}