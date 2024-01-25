import React, { ReactNode, createContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { iUserData, initialUserData } from "../data/user_data/userData";
import { apiGet } from "../services/api_client";

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
    console.log('checking auth in AuthProvider');

    const controller = new AbortController();

    const getUser = async () => {
      console.log('updating token in AuthProvider')
      try {
        console.log("trying to make a request in AuthProvider");
        const response = await apiGet('login/getuser', controller)
        console.log(response);
        if (!response.error) {
          setAuth(response)
        }
        else {
          throw new Error('error updating user token')
        }
      } catch (err) {
          console.log(err)
          setAuth(initialUserData); 
        }
      }
    const intervalId = setInterval(() => {
      getUser();
    }, 10 * 60 * 1000);
    getUser();

    return () => {
      clearInterval(intervalId);
    }
  }, [location.pathname])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
