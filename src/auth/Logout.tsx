import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { AuthService as service } from "../service/auth.service";

export const Logout = () => {
  const { setCurrentUser }: any = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser();
    service.logout();
    navigate("/login");
  }

  useEffect(() => {
    handleLogout();
  });

  return <>Logout...</>;
}