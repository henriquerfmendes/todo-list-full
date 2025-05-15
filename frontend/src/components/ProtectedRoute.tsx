import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;