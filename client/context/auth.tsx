'use client'
import React, { ReactNode, useContext, useEffect } from "react";
import apiClient from "@/lib/apiClients";

interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  
  useEffect(()=> {
    const token = localStorage.getItem("auth_token");
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  }, [])
  
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
  }

  const logout = () => {
    localStorage.removeItem("auth_token");
  }

  const value = {
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};
