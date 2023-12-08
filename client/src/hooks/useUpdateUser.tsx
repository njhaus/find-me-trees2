import { useState, useEffect } from "react";
import useLogout from "./useLogout";
import { apiPatch } from "../services/api_client";
import { iUserData } from "../data/user_data/userData";
import useAuth from "./useAuth";
import { initialUserData } from "../data/user_data/userData";

const useUpdateUser = () => {
  const logout = useLogout("You have been logged out due to an error.");
  const {auth, setAuth} = useAuth()

  const [userData, setUserData] = useState<iUserData>(auth || initialUserData);

  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const handleUpdateUser = async(dataType: keyof iUserData, data: any) => {
    // Hold previos user data in case of save error
    const prevUserData = userData;
    console.log("AUTH IS NOW:")
    console.log(auth);
    // Update userData for saving and User Interface
    const updatedUserData = { ...userData, [dataType]: data };
    setUserData(updatedUserData);

    // Optimistic update: set auth data to user data (This includes the accessToken which hasn't changed.)
    setAuth(updatedUserData);
    try {
      const res = await apiPatch("user/update", updatedUserData);

      if (res.code) {
        console.log("ERROR updating user in useUpdateUser");
        console.log(res.message);
        // On error, reset data to previous user data and log out
        setUserData(prevUserData);
        setAuth(prevUserData);
        logout();
        // return prevUserData;
      } else {
        console.log("NO ERROR updating user in useUpdateUser!");
        console.log(res);
        // Officially set auth to response from server -- saved to server.
        setAuth(res);
        // return updatedUserData;
      }
    } catch (err) {
      console.log("ERROR updating user in useUpdateUser");
      console.log(err);
      // On error, reset data to previous user data and log out
      setUserData(prevUserData);
      setAuth(prevUserData);
      logout();
      // return updatedUserData;
    }
  };
    
    
  useEffect(() => {
    setUserData(auth);
  }, [auth]);


  return { userData, handleUpdateUser };
};

export default useUpdateUser;
