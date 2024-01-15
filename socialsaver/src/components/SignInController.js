import React, { useState } from 'react';
import { useUserContext } from '../context/User';
import "./css/SignInController.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


const SignInController = ({login}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setUser, handleLoginSuccess } = useUserContext();
    
    // Handle status change
    const statusChangeCallback = (response) => {
            console.log("STATUS CALLBACK")
            console.log(response);
            setIsLoggedIn(true);
            handleLoginSuccess(response)
            login()
    };

    const handleLogin = () => {
        if (!window.FB) {
            console.error("Facebook SDK not initialized.");
            return;
        }
        window.FB.login(function(response) {
            if (response.authResponse) {
                statusChangeCallback(response)
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile, user_photos', return_scopes: true});
        

    };

    return (
        <div> 
            <button className="fb-login-button" onClick={handleLogin}>
                <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
            </button>
        </div>
    );
};

export default SignInController;
