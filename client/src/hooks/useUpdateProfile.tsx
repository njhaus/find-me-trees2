import { useState, useEffect } from "react";
// import useLogout from "./useLogout";
import { apiPatch } from "../services/api_client";
import useAuth from "./useAuth";
import { initialUserData, isUserData } from "../pages/user/user_data/userData";
import { iUserData } from "../pages/user/user_data/userData";
import { updatedDataT } from "../pages/user/UserProfile";
import useServerError from "./useServerError";
import { ApiErrorType, isApiErrorType } from "../data/types";
import useLogout from "./useLogout";

const useUpdateProfile = () => {
  // const logout = useLogout("You have been logged out due to an error.");
  const { auth, setAuth } = useAuth();

  const [userData, setUserData] = useState<iUserData>(auth || initialUserData);

  const { setServerError } = useServerError();

  const handleUpdateProfile = async (
    oldData: iUserData,
    newData: updatedDataT,
    currPassword: string
  ) => {
    // Hold previos user data in case of save error
    const prevUserData = oldData;
    // Update userData for saving and User Interface
    const updatedUserData = {
      ...userData,
      username: newData.username,
      email: newData.email,
    };
    setUserData(updatedUserData);
    // Create new user profile body -- needs old and new data to find user and update
    const body = {
      newUsername: newData.username ? newData.username : oldData.username,
      newEmail: newData.email ? newData.email : oldData.email,
      newPassword: newData.password,
      accessToken: oldData.accessToken,
      username: oldData.username,
      email: oldData.email,
      password: currPassword,
    };
    // Optimistic update: set auth data to user data (This includes the accessToken which hasn't changed.)
    setAuth(updatedUserData);
    try {
      const res: Awaited<iUserData | ApiErrorType> = await apiPatch("user/profileupdate", body);
       if (isUserData(res)) {
         console.log("NO ERROR updating user in useUpdateUser!");
         console.log(res);
         // Officially set auth to response from server -- saved to server.
         setAuth((res as iUserData));
         // return updatedUserData;
       } else {
          if (isApiErrorType(res)) {
            // On error, reset data to previous user data and log out
            setUserData(prevUserData);
            setAuth(prevUserData);
            useLogout();
            throw new Error((res as ApiErrorType).error);
            // return prevUserData;
          } else {
            throw new Error("Error updating user: Server error 500");
          }
       }
    } catch (err) {
      console.error("ERROR updating user in useUpdateUser");
      console.error(err);
      // On error, reset data to previous user data and log out
      setUserData(prevUserData);
      setAuth(prevUserData);
       setServerError(
         typeof err === "string"
           ? err
           : (err as Error).message
           ? (err as Error).message
           : "An unknown error occurred"
       );
      // return updatedUserData;
    }
  };

  useEffect(() => {
    setUserData(auth);
  }, [auth]);

  return { userData, handleUpdateProfile };
};

export default useUpdateProfile;
