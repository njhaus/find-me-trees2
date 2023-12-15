import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useServerError = () => {
  const location = useLocation();
    const navigate = useNavigate();


  const setServerError = (message?: string) => {

    navigate(location.pathname, {
      state: {
        message: message || "An unknown error occurred.",
      },
    });
  };

  return { setServerError };
};

export default useServerError;
