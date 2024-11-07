import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const AuthRequired = ({ children }) => {
  const { isAuthenticated }: any = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
