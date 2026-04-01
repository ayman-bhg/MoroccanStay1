import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
export function ProtectedRoute({ Component }) {
    const { isAdmin } = useAuth();
    if (!isAdmin) {
        return <Navigate to="/admin/login" replace/>;
    }
    return <Component />;
}

