import React, { useState } from "react";
import { useQuery } from "react-query";
import * as authApi from "@/api/authApi";

type AppContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  showToast?: (opts: { title: string; description?: string; type?: string }) => void;
};

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const hasStoredToken = !!(localStorage.getItem("session_id") && localStorage.getItem("user_id"));

  const { isError, isLoading, data } = useQuery("validateToken", authApi.validateToken, {
    retry: false,
    refetchOnWindowFocus: true,
    enabled: hasStoredToken,
  });

  const isLoggedIn = !isError && !isLoading && !!data;

  return (
    <AppContext.Provider value={{ isLoggedIn, isLoading }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
};
