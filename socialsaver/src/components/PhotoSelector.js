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

    const images = [
        // {
        //    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        //    width: 320,
        //    height: 174,
        //    isSelected: true,
        //    caption: "After Rain (Jeshu John - designerspics.com)",
        // },
        // {
        //    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        //    width: 320,
        //    height: 212,
        //    tags: [
        //       { value: "Ocean", title: "Ocean" },
        //       { value: "People", title: "People" },
        //    ],
        //    alt: "Boats (Jeshu John - designerspics.com)",
        // },
        // {
        //    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        //    width: 320,
        //    height: 212,
        // },
     ];


    return (
        <div>
            <button onClick={handleCartShow} className="cart-icon-button">
                <FontAwesomeIcon icon={faImage} size="2x" /> {/* Increased size */}
                {cartItems.length > 0 && 
                    <span className="cart-item-count">{cartItems.length}</span>
                }
            </button>

            <PhotoFilterOptions />
            <div className="gallery">
                <PhotoGallery 
                    imagesProp={images}
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
