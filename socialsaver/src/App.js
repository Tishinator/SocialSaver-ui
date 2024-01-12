import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider, useUserContext } from './context/User';
import AuthenticationHandler from './util/AuthenticationHandler';
import LaunchPage from './pages/LaunchPage';


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
      };
      
        
  }, []);

  return (
    <UserProvider>
        {isFBInitialized && <AuthenticationHandler />}
        <div className="App">
          <LaunchPage />
        </div>
      
    </UserProvider>
  );
}

export default App;
