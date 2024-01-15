import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/User";
import './css/SocialSaverPage.css'
import Carousel from "react-bootstrap/Carousel";
import Welcome from "../components/Welcome";
import PhotoSelector from "../components/PhotoSelector";
import Header from "../components/Header";

function SocialSaver() {
    const {user} = useUserContext();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    const goNext = () => {
        console.log('goNext called');
        setIndex((prevIndex) => prevIndex === 0 ? 1 : 0);
    }

    useEffect(() => {
        if (!user) {
            setIndex(0);
        }
    }, [user]);

    return (
        <div>
            <div className="header"><Header/></div>
            <div className="content">
                <Carousel activeIndex={index} onSelect={handleSelect} interval={null} controls={false} indicators={false} slide={false}>
                    <Carousel.Item>
                        <Welcome goNext={goNext}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <PhotoSelector pageIndex={index} />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>

    );
};

export default SocialSaver;
