import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function RootRedirect() {
  const { role } = useAuth();

  // If user has a role set, redirect to appropriate page
  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "customer") {
    return <Navigate to="/home" replace />;
  }

  // If no role is set, show role selection
  return <Navigate to="/select-role" replace />;
}
