import React, { useState, useEffect } from "react";
import PhotoGallery from "./PhotoGallery";
import Cart from "./Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import FacebookPhotoHelper from "../util/FacebookPhotoHelper";
import "./css/PhotoSelector.css"


function PhotoSelector() {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [shownImages, setShownImages] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingStep, setLoadingStep] = useState("");
    const [loadingStatus, setLoadingStatus] = useState("success");
    const [showLoadButton, setShowLoadButton] = useState(true);
    const [showCartButton, setShowCartButton] = useState(true);

    
    async function loadPhotos() {
            setShowLoadButton(false);
            setShowCartButton(false);
            setShowLoading(true);
            try {
                setLoadingProgress(10)
                setLoadingStep("Loading Album Photos");
                const album = await FacebookPhotoHelper.getAlbumPhotos();
                setLoadingProgress(33);

                setLoadingStep("Loading Your Photos");
                const uploaded = await FacebookPhotoHelper.getYourPhotos();
                setLoadingProgress(66);

                setLoadingStep("Loading Tagged Photos");
                const tagged = await FacebookPhotoHelper.getTagged();
                setLoadingProgress(100);

                const combinedImages = [...new Set([...tagged, ...uploaded, ...album].map(JSON.stringify))].map(JSON.parse);
                setShownImages(combinedImages);
                setShowLoading(false)
                setShowCartButton(true);


            } catch (error) {
                setLoadingStep('ERROR LOADING PHOTOS');
                setLoadingStatus("danger");
                setLoadingProgress(99);
                setShowLoading(false)
                setShowCartButton(true);
                
                // Handle error (e.g., show an error message to the user)
            }            
    }
       


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



    return (
        <div>
            {showLoadButton ? <Button onClick={loadPhotos} variant='warning' className="load-button">Load Images</Button> : <div></div>}
            {showCartButton ?
            <Button onClick={handleCartShow} variant="success" className="cart-button">
                {/* <FontAwesomeIcon icon={faImage} size="2x" />  */}
                Download
                {cartItems.length > 0 && 
                    <span > ({cartItems.length})</span>
                }
            </Button> 
            :
            <div></div>}

            <div className="gallery">
                {((showLoading)&&(loadingProgress < 100)) ? (
                    <div>
                        <h4>{loadingStep}</h4>
                        <ProgressBar now={loadingProgress} animated variant={loadingStatus}/>
                    </div>
                ) : (
                    <PhotoGallery 
                        imagesProp={shownImages}
                        cartItems={cartItems}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                )}
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
