import { apiGet } from '../services/api_client'
import useAuth from './useAuth'

const useRefreshToken = () => {

    const abortController = new AbortController();

    const { setAuth } = useAuth();
    const refresh = async () => {
        console.log("refresh token running");
        const response = await apiGet('login/refresh', abortController);
        console.log(response);
        if (response !== 'error') {
            setAuth(prev => {
                return {
                    ...prev, accessToken: response.accessToken
                }
            })
            return response.accessToken;
        }
        else {
            console.log('error refreshing access token');
        }
    }
    return refresh;
}

export default useRefreshToken
