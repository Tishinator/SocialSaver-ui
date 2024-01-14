import React, {useEffect} from "react";
import { useUserContext } from "../context/User";
import Button from 'react-bootstrap/Button';
import pageText from '../data/welcome.json';
import SignInController from "./SignInController";
import "./css/Welcome.css"; 

function Welcome({carouselControl}) {
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
            // Perform actions needed after user login
            console.log("User logged in:", user);
        }
    }, [user]);

    return (
        <div className="content-container">
            {user ? <p className="intro-text">Hello {user.name}!</p> : <div></div>}
            <h1 className="main-heading">{pageText.welcome}</h1>
            <p className="description">{pageText.description}</p>
            <div className="button-group">
                {user ? <Button className="primary-button" onClick={carouselControl}>Get Started</Button> : <SignInController />}
                
            </div>
        </div>
    );
}

export default Welcome;
