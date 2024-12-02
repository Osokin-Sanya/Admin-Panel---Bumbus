import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { selectIsAuth, selectIsLoading } from "../../features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuth && location.pathname !== "/auth") {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (isAuth && location.pathname === "/auth") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
