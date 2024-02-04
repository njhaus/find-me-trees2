import { useState, useEffect } from "react";
// import useLogout from "./useLogout";
import { apiPatch } from "../services/api_client";
import { iUserData, isUserData } from "../pages/user/user_data/userData";
import useAuth from "./useAuth";
import { initialUserData } from "../pages/user/user_data/userData";
import useServerError from "./useServerError";
import { ApiErrorType, isApiErrorType } from "../data/types";

const useUpdateUser = () => {
  // const logout = useLogout("You have been logged out due to an error.");
  const { auth, setAuth } = useAuth();

  const [userData, setUserData] = useState<iUserData>(auth || initialUserData);

  const { setServerError } = useServerError();

  const handleUpdateUser = async (dataType: keyof iUserData, data: any) => {
    // Hold previos user data in case of save error
    const prevUserData = userData;
    console.log("AUTH IS NOW:");
    console.log(auth);

    // Update userData for saving and User Interface
    const updatedUserData = { ...userData, [dataType]: data };
    setUserData(updatedUserData);

    // Optimistic update: set auth data to user data (This includes the accessToken which hasn't changed.)
    setAuth(updatedUserData);
    try {
      const res: Awaited<iUserData | ApiErrorType> = await apiPatch("user/update", updatedUserData);

      if (isUserData(res)) {
        console.log("NO ERROR updating user in useUpdateUser!");
        console.log(res);
        // Officially set auth to response from server -- saved to server.
        setAuth(res as iUserData);
        // return updatedUserData;
      } else {
        if (isApiErrorType(res)) {
          console.error("ERROR updating user in useUpdateUser");
          console.log((res as ApiErrorType).error)
          throw new Error((res as ApiErrorType).error);
        }
        else {throw new Error('Error updating user: Server error 500')}
      }
    } catch (err) {
      console.log("ERROR updating user in useUpdateUser");
      console.log(err);
      // On error, reset data to previous user data and send error message
      setUserData(prevUserData);
      setAuth(prevUserData);
      setServerError(
        typeof err === "string"
          ? err
          : ((err as Error).message
            ? (err as Error).message
            : "An unknown error occurred")
      );
      // return updatedUserData;
    }
  };

  useEffect(() => {
    setUserData(auth);
  }, [auth]);

  return { userData, handleUpdateUser };
};

export default useUpdateUser;
