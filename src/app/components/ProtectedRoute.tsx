import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  Component: React.ComponentType;
}

export function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Component />;
}
