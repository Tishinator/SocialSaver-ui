// AuthenticationHandler.js
import { useEffect } from 'react';
import { useUserContext } from '../context/User';

const AuthenticationHandler = () => {
    const { setUser, handleLoginSuccess } = useUserContext();

    useEffect(() => {
        if (window.FB) {
            window.FB.getLoginStatus(function(response) {
                console.log(response)
                if (response.status === 'connected') {
                    handleLoginSuccess(response);
                }else{
                    setUser(null);
                }
            });
        }
    }, [window.FB]);

    return null; // This component does not render anything
};

export default AuthenticationHandler;
