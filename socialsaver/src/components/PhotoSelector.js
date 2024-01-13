import React, { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import PhotoFilterOptions from "./PhotoFilterOptions";
import Cart from "./Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import "./css/PhotoSelector.css"

function PhotoSelector() {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [shownImages, setShownImages] = useState([]);
    const [taggedPhotos, setTaggedPhotos] = useState([]);
    const [yourPhotos, setYourPhotos] = useState([]);

    const addToCart = (image) => {
        setCartItems(prevItems => [...prevItems, image]);
    };

    const removeFromCart = (imageSrc) => {
        setCartItems(prevItems => prevItems.filter(item => item.src !== imageSrc));
    };

    const clearCart = () => {
        setCartItems([]);
    };


    const handleCartShow = () => setShowCart(true);
    const handleCartClose = () => setShowCart(false);

    const handleTaggedPhotos = (images) => {
        setShownImages(images)
        setTaggedPhotos(images)
    }

    const handleYourPhotos = (images) => {
        setShownImages(images)
        setYourPhotos(images)
    }



    return (
        <div>
            <button onClick={handleCartShow} className="cart-icon-button">
                <FontAwesomeIcon icon={faImage} size="2x" /> {/* Increased size */}
                {cartItems.length > 0 && 
                    <span className="cart-item-count">{cartItems.length}</span>
                }
            </button>

            <PhotoFilterOptions
                taggedPhotos={taggedPhotos}
                yourPhotos={yourPhotos} 
                handleTaggedPhotos={handleTaggedPhotos}
                handleYourPhotos={handleYourPhotos}
            />
            <div className="gallery">
                <PhotoGallery 
                    imagesProp={shownImages}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            </div>
            <Cart 
                items={cartItems} 
                removeFromCart={removeFromCart} 
                clearCart={clearCart} 
                show={showCart} 
                handleClose={handleCartClose} 
            />
        </div>
    );
}

export default PhotoSelector;
