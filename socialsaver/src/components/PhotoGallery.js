import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import { Button } from "react-bootstrap";
import "./css/PhotoGallery.css"

function PhotoGallery({ imagesProp, cartItems, addToCart, removeFromCart }) {
    // Using a state to manage and reflect the selection status of images
    const [images, setImages] = useState([]);
    const hasSelected = images.some((image) => image.isSelected);

    useEffect(() => {
        // Initialize images with the isSelected property
        const initializedImages = imagesProp.map(img => ({
            ...img,
            isSelected: cartItems.some(item => item.src === img.src)
        }));
        setImages(initializedImages);
    }, [imagesProp, cartItems]); // Depend on imagesProp and cartItems

    const onImageSelect = (index, image) => {
        let newImages = [...images];
        newImages[index].isSelected = !newImages[index].isSelected;
        setImages(newImages);

        if (newImages[index].isSelected) {
            addToCart(image);
        } else {
            removeFromCart(image.src);
        }
    };


    const handleSelectAllClick = () => {
        const nextImages = images.map((image) => ({
            ...image,
            isSelected: !hasSelected,
        }));
        setImages(nextImages);
        nextImages.forEach((image)=> {
            if (image.isSelected){
                addToCart(image);
            }else{
                removeFromCart(image.src);
            }
        })
    };

    return (
        <div>
            <Button onClick={handleSelectAllClick} className="gallery-button" variant="primary">
                {hasSelected ? "Clear selection" : "Select all"}
            </Button>
            <div className="gallery-container">
                <Gallery
                    images={images}
                    onSelect={onImageSelect}
                    onClick={onImageSelect}
                    enableImageSelection={true}
                />
            </div>
        </div>
    );
}

export default PhotoGallery;
