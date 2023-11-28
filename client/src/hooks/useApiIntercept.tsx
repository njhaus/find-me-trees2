import { useEffect } from "react"
import { apiIntercept } from "../services/api_client"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"

const useApiIntercept = () => {

    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // set up request, add authorization headers if they don't exist & reject if there is an error setting the config
        const requestIntercept = apiIntercept.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                }
                return config
            }, (err) => Promise.reject(err)
        )
        // make the request with interceptors to return if there is an error -- we are expecting an expired accesstoken
        const responseIntercept = apiIntercept.interceptors.response.use(
            response => response,
            async (err) => {
                const prevReq = err?.config;
                if (err?.response?.status === 403 && !prevReq?.sent) {
                    // Set sent property to avoid infinite loop
                    prevReq.sent = true;
                    const newAccessToken = await refresh();
                    prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiIntercept(prevReq);
                }
                return Promise.reject(err)
            }
        )
         return () => {
           apiIntercept.interceptors.request.eject(requestIntercept);
           apiIntercept.interceptors.request.eject(responseIntercept);
         };
        
    }, [auth, refresh])

  return apiIntercept
}

export default useApiIntercept
