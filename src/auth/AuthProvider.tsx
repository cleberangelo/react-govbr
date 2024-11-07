import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthService as service } from "../service/auth.service";
import { AuthResponse } from "../model/auth-response.model";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, _setCurrentUser] = useState<AuthResponse>(service.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(service.isAuthenticated());
  const [loading, setLoading] = useState<boolean>(false);

  const setCurrentUser = (data: AuthResponse) => {
    _setCurrentUser(data);
  }

  useEffect(() => {
    if (service.isAuthenticated()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, currentUser]);

  const contextValue = useMemo(() => ({
    loading,
    setLoading,
    isAuthenticated,
    currentUser,
    setCurrentUser,
  }),
    [loading, setLoading, isAuthenticated, currentUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}