import { useState, useEffect } from 'react';

const useUser = () => {
    const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to handle user login
    const handleLoginSuccess = (response) => {
        console.log("Successful login!");
       
        
        if (response.status === 'connected') {
            window.FB.api('/me', { fields: 'name,email,picture' }, function(userInfo) {
                updateUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture.data.url,
                    accessToken: response.authResponse.accessToken, // Store access token
                    userID: response.authResponse.userID,
                    expiresIn: response.authResponse.expiresIn
                });
            });
        }

    };

    // Function to log out user
    const logout = () => {
        window.FB.logout(function(response) {
            updateUser(null); // Clear user data on logout
        });
    };

    return { user, handleLoginSuccess, logout };
};

export default useUser;
