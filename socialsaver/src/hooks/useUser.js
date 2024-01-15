import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
    const [user, setUser] = useState(null);
    // let navigate = useNavigate();

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to handle user login
    const handleLoginSuccess = (response) => {
        console.log("Successful login!");
       
        console.log(response.status)
        if (response.status === 'connected') {
            window.FB.api('/me', { fields: 'name', }, function(userInfo) {
                console.log("UPDATING USER : ")
                console.log(userInfo)
                updateUser({
                    name: userInfo.name,
                    accessToken: response.authResponse.accessToken, // Store access token
                    userID: response.authResponse.userID,
                    expiresIn: response.authResponse.expiresIn
                });
            });
        }
    };

    // Function to log out user
    const logout = () => {
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              window.FB.logout(function(response) {
                // User is now logged out of Facebook
                console.log('Logged out of Facebook.');
                setUser(null);
                // Redirect to home page
                // navigate('/');
              });
            } else {
              console.log("No user currently logged in through Facebook SDK.");
            }
          });
        
          window.FB.getLoginStatus(function(response){
            console.log("SDK  STATUS AFTER LOGOUT : " + response.status)

          })
    };

    return { user, setUser, handleLoginSuccess, logout };
};

export default useUser;
