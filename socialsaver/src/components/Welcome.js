import React from "react";
import { useUserContext } from "../context/User";
import Button from 'react-bootstrap/Button';
import pageText from '../data/welcome.json';
import "./css/Welcome.css"; // Ensure this path is correct

function Welcome({carouselControl}) {
    const { user } = useUserContext();
    return (
        <div className="content-container">
            <p className="intro-text">Hello {user.name}!</p>
            <h1 className="main-heading">{pageText.welcome}</h1>
            <p className="description">{pageText.description}</p>
            <div className="button-group">
                <Button className="primary-button" onClick={carouselControl}>Get Started</Button>
            </div>
        </div>
    );
}

export default Welcome;
