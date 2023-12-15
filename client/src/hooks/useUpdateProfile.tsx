import { useState, useEffect } from "react";
import useLogout from "./useLogout";
import { apiPatch } from "../services/api_client";
import useAuth from "./useAuth";
import { initialUserData } from "../data/user_data/userData";
import { iUserData } from "../data/user_data/userData";
import { updatedDataT } from "../pages/user/UserProfile";
import useServerError from "./useServerError";

const useUpdateProfile = () => {
  const logout = useLogout("You have been logged out due to an error.");
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
    const updatedUserData = { ...userData, username: newData.username, email: newData.email };
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
      const res = await apiPatch("user/profileupdate", body);

      if (res.code) {
        // On error, reset data to previous user data and log out
        setUserData(prevUserData);
        setAuth(prevUserData);
        if (res.response && res.response.status && res.response?.status === 401) {
          throw new Error('Incorrect password')
        }
        else {
          console.warn(`Devmessage: ${res.devMsg}`);
          throw new Error(res.message);
        }
        // return prevUserData;
      } else {
        console.log("NO ERROR updating user in useUpdateUser!");
        console.log(res);
        // Officially set auth to response from server -- saved to server.
        setAuth(res);
        // return updatedUserData;
      }
    } catch (err: any) {
      console.error("ERROR updating user in useUpdateUser");
      console.error(err);
      // On error, reset data to previous user data and log out
      setUserData(prevUserData);
      setAuth(prevUserData);
      setServerError(err.message)
      // return updatedUserData;
    }
  };

  useEffect(() => {
    setUserData(auth);
  }, [auth]);

  return { userData, handleUpdateProfile };
};

export default useUpdateProfile;
