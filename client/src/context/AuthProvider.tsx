import React, { useState, createContext, ReactNode, useEffect } from "react";

import { iUserSaved, iUserFound, iUserFavorites, initialUserData } from "../data/user_data/userData";
import useApiIntercept from "../hooks/useApiIntercept";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { iUserData } from "../data/user_data/userData";

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
  const apiIntercept = useApiIntercept();
  const location = useLocation();


  useEffect(() => {
    console.log('checking auth');
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      console.log('updating token')
      try {
        const response = await apiIntercept.get('/login/getuser', {
          signal: controller.signal
        })
        console.log(response.data);
        isMounted && setAuth(response.data)
      } catch (err) {
        console.log(err);  
        setAuth(initialUserData);
      }
    }
    const intervalId = setInterval(() => {
      getUser();
    }, 10 * 60 * 1000);
    getUser();

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(intervalId);
    }
  }, [location.pathname, apiIntercept])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
