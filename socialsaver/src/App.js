import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './context/User';
import AuthenticationHandler from './util/AuthenticationHandler';
// import Welcome from './components/Welcome';
import backgroundImage from './assets/pexels-johannes-plenio-1103970.jpg';
import SocialSaver from './pages/SocialSaverPage';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';



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
            
            <div className="App">
                <div className='app-content'>
                <Router>
                  <Routes>
                    <Route path="/" element={<SocialSaver />} />
                  </Routes>
                </Router>
                </div>
            </div>
            <div className="overlay"></div>
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
