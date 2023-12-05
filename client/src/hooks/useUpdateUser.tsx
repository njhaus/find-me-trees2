import { useState, useEffect } from "react";
import useLogout from "./useLogout";
import { apiPatch } from "../services/api_client";
import { iUserData } from "../data/user_data/userData";
import useAuth from "./useAuth";
import { initialUserData } from "../data/user_data/userData";

const useUpdateUser = () => {
    const logout = useLogout();
    const {auth, setAuth} = useAuth()

  const [userData, setUserData] = useState<iUserData>(auth || initialUserData);

  const handleUpdateUser = (dataType: keyof iUserData, data: any) => {
    const updatedUserData = { ...userData, [dataType]: data };
    setUserData(updatedUserData);

    apiPatch("user/update", updatedUserData)
      .then((res) => {
        if (res.code) {
          console.log(res.message);
          setUserData(userData);
          logout();
        } else {
          console.log("NO ERROR!");
            console.log(res);
            setAuth(res);
        //   setUserData(res); --> SHOULD update upon auth update
        }
      })
      .catch((err) => {
        console.log(err);
        setUserData(userData);
        logout();
      });
  };
    
    
  useEffect(() => {
    setUserData(auth);
  }, [auth]);


  return { userData, handleUpdateUser };
};

export default useUpdateUser;
