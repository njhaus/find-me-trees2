
// THIS HOOK IS PROBABLY UNNECESSARY -- USERDATA IS PASSED IN THE authContext OR useUpdateUser HOOK.

import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { iUserData } from "../data/user_data/userData";

const useUserData = () => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState<iUserData | null>(null);

  useEffect(() => {
    setUserData(auth)
  }, [auth]);

  return userData;
};

export default useUserData;
