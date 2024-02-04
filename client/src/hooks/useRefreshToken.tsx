import { ApiErrorType, isApiErrorType } from '../data/types';
import { iUserData, isUserData } from '../pages/user/user_data/userData';
import { apiGet } from '../services/api_client'
import useAuth from './useAuth'
import useServerError from './useServerError';

const useRefreshToken = () => {

  const abortController = new AbortController();
  const{ setServerError } = useServerError();

    const { setAuth } = useAuth();
    const refresh = async () => {
        console.log("refresh token running");
        const response: Awaited<iUserData | ApiErrorType> = await apiGet('login/refresh', abortController);
        console.log(response);
        if (isUserData(response)) {
            setAuth((prev) => {
              return {
                ...prev,
                accessToken: (response as iUserData).accessToken,
              };
            });
            return (response as iUserData).accessToken;
        } else {
          if (isApiErrorType(response)) {
            setServerError((response as ApiErrorType).error)
          }
          else {
            setServerError("Error updating access: Server error 500");
          }
        }
    }
    return refresh;
}

export default useRefreshToken
