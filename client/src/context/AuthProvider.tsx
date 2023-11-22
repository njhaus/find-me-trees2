import React, { useState, createContext, ReactNode } from "react";

import { iUserSaved, iUserFound, iUserFavorites } from "../data/user_data/userData";

export interface iUserData {
  username?: string;
  email?: string;
  collections?: string[];
  saved?: iUserSaved;
  found?: iUserFound;
  favorites?: iUserFavorites;
}

interface AuthContextProps {
  auth: iUserData;
  setAuth: React.Dispatch<React.SetStateAction<iUserData>>; // Replace 'any' with the type of setAuth
}


export const AuthContext = createContext<AuthContextProps>({
  auth: {},
  setAuth: () => {}, // Provide a default function for setAuth
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
