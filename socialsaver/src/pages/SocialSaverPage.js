import React, { useState } from "react";
import { useUserContext } from "../context/User";
import './css/SocialSaverPage.css'
import Carousel from "react-bootstrap/Carousel";
import Welcome from "../components/Welcome";
import PhotoSelector from "../components/PhotoSelector";


function SocialSaver() {
    const {user} = useUserContext();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    const goNext = () => {
        setIndex((prevIndex) => prevIndex === 0 ? 1 : 0);
    }

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null} controls={false} indicators={false} >
            <Carousel.Item>
                <Welcome carouselControl={goNext}/>
            </Carousel.Item>
            <Carousel.Item>
                <PhotoSelector />
            </Carousel.Item>
        </Carousel>
    );
};

export default SocialSaver;
