import React from "react";
import { useUserContext } from "../context/User";
import Button from 'react-bootstrap/Button';
import backgroundImage from '../assets/mountain.jpg';
import './css/SocialSaverPage.css'
import pageText from '../data/welcome.json'

function SocialSaver() {
    const {user} = useUserContext();
    return (
        <div className="background-container" style={{ fontFamily: 'sans-serif' }}>
            <div className="overlay"></div>
            <div className="content-container">
                <p className="intro-text">Hello {user.name}!</p>
                <h1 className="main-heading">{pageText.welcome}</h1>
                <p className="description">{pageText.description} </p>
                <div className="button-group">
                    <Button className="primary-button">Get Started</Button>
                </div>
            </div>
            <img
                className="background-image"
                src={backgroundImage}
                alt="Your awesome business idea background image"
            />
        </div>
    );
};

export default SocialSaver;
