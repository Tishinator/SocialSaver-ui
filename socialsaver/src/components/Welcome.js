import React, {useEffect, useState} from "react";
import { useUserContext } from "../context/User";
import Button from 'react-bootstrap/Button';
import pageText from '../data/welcome.json';
import SignInController from "./SignInController";
import "./css/Welcome.css"; 
import { useNavigate } from 'react-router-dom';


function Welcome({ goNext = () => {} }) {
    const { user } = useUserContext();
    const [isUserLoggedIn, setUserLoggedIn] = useState(false)


    useEffect(() => {
        if (user) {
            // Perform actions needed after user login
            console.log("User logged in:", user);
            setUserLoggedIn(true)
        }
    }, [user]);

    function login(){
       
        goNext();
    }

    return (
        <div className="content-container">
            {(isUserLoggedIn && user)? <p className="intro-text">Hello {user.name}!</p> : <div></div>}
            <h1 className="main-heading">{pageText.welcome}</h1>
            <p className="description">{pageText.description}</p>
            <div className="button-group">
                {(isUserLoggedIn && user) ? <Button className="primary-button" onClick={() => {
                                    console.log('Button clicked');
                                    console.log(typeof goNext); // Should log 'function'
                                    goNext();
                                }}>Get Started</Button> : <SignInController login={login}/>}
                
            </div>
        </div>
    );
}

export default Welcome;
