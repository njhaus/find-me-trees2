import useAuth from "./useAuth"
import { apiPost } from "../services/api_client";
import { initialUserData } from "../data/user_data/userData";
import { useNavigate } from "react-router-dom";

const useLogout = (message?: string) => {


    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        const loggedInUser = await apiPost("login/logout", { auth });
        console.log(loggedInUser)
        setAuth(initialUserData);
        navigate("/", {
          state: {
            message: message || "You have been logged out.",
          },
        });
    }
    
  return logout;
}

export default useLogout
