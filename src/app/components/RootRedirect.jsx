import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
export function RootRedirect() {
    const { role } = useAuth();
    if (role === "admin") {
        return <Navigate to="/admin" replace/>;
    }
    if (role === "customer") {
        return <Navigate to="/home" replace/>;
    }
    return <Navigate to="/select-role" replace/>;
}

