import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth.ts";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
