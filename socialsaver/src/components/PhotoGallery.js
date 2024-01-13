import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import "./css/PhotoGallery.css"

function PhotoGallery({ imagesProp, cartItems, addToCart, removeFromCart }) {
    // Using a state to manage and reflect the selection status of images
    const [images, setImages] = useState([]);

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

    return (
        <div className="gallery-container">
            <Gallery
                images={images}
                onSelect={onImageSelect}
                onClick={onImageSelect}
                enableImageSelection={true}
            />
        </div>
    );
}

export default PhotoGallery;
