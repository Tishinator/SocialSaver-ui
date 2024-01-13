import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';


const SignInController = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, handleLoginSuccess } = useUser();
    
    // Handle status change
    const statusChangeCallback = (response) => {
        if (response.status === 'connected') {
            // User is logged in and authenticated
            console.log("logged in")
            setIsLoggedIn(true);
            handleLoginSuccess(response)
        } else {
            console.log("Not logged in")
            // User is not logged in
            setIsLoggedIn(false);
        }
    };

    const handleLogin = () => {
        
        window.FB.login(function(response) {
            statusChangeCallback(response);
        }, { scope: 'public_profile,email' });
        

    };

    return (
        <div>
            {isLoggedIn ? (
                <div>Welcome to the app!</div>
            ) : (
                <div>
                    <h1>Welcome to Social Saver</h1>
                    <button onClick={handleLogin}>Login with Facebook</button>
                </div>
            )}
        </div>
    );
};

export default SignInController;
