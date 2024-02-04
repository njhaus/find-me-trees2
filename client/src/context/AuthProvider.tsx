import React, { ReactNode, createContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { iUserData, initialUserData, isUserData } from "../pages/user/user_data/userData";
import { apiGet } from "../services/api_client";
import { ApiErrorType, isApiErrorType } from "../data/types";
import useServerError from "../hooks/useServerError";

interface AuthContextProps {
  auth: iUserData;
  setAuth: React.Dispatch<React.SetStateAction<iUserData>>; // Replace 'any' with the type of setAuth
}

export const AuthContext = createContext<AuthContextProps>({
  auth: initialUserData,
  setAuth: () => {}, // Provide a default function for setAuth
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(initialUserData);
  const location = useLocation();

  useEffect(() => {
    console.log("checking auth in AuthProvider");

    const controller = new AbortController();

    const getUser = async () => {
      console.log("updating token in AuthProvider");
      try {
        console.log("trying to make a request in AuthProvider");
        const response: Awaited<iUserData | ApiErrorType> = await apiGet(
          "login/getuser",
          controller
        );
        console.log(response);
        if (isUserData(response)) {
          console.log("good response");
          console.log(response);
          setAuth((response as iUserData));
        } else {
          if (isApiErrorType(response)) {
             console.log((response as ApiErrorType).error);
            throw new Error((response as ApiErrorType).error);
          }
          else {throw new Error("Error getting Authorization: Server error 500");}
        }
      } catch (err) {
        console.log(err);
        // Don't send an error since th user login is checked on each page change
        setAuth(initialUserData);
      }
    };
    const intervalId = setInterval(() => {
      getUser();
    }, 10 * 60 * 1000);
    getUser();

    return () => {
      clearInterval(intervalId);
    };
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
