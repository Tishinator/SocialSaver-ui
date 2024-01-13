import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider, useUserContext } from './context/User';
import AuthenticationHandler from './util/AuthenticationHandler';
import LaunchPage from './pages/LaunchPage';
import backgroundImage from './assets/pexels-johannes-plenio-1103970.jpg';


function App() {
  const [isFBInitialized, initializeFB] =  useState(false);


  useEffect(() => {
      // Load Facebook SDK
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));


      window.fbAsyncInit = function() {
        window.FB.init({
          appId      : process.env.REACT_APP_FACEBOOK_APP_ID,
          cookie     : true,
          xfbml      : true,
          version    : 'v18.0'
        });
          
        window.FB.AppEvents.logPageView();   
        initializeFB(true);
        console.log("Initialized FB SDK!")
      };
      
        
  }, []);

  return (
    <UserProvider>
        {isFBInitialized && <AuthenticationHandler />}
        <div className="background-container" style={{ fontFamily: 'sans-serif' }}>
            <div className="overlay"></div>
            <div className="App">
                <LaunchPage />
            </div>
            <img
                className="background-image"
                src={backgroundImage}
                alt=""
            />
        </div>
    </UserProvider>
  );
}

export default App;
