import { Spinner } from "@heroui/react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);

  if (isLoadingAuth) {
    return <Spinner color="success" />;
  }

  if (!isLoadingAuth && !isAuthenticated) {
    console.log({ location });
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
