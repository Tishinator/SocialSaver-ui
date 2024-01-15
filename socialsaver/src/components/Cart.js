import React, { useState } from 'react';
import { Offcanvas, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './css/Cart.css';

const Cart = ({ items, removeFromCart, clearCart, show, handleClose }) => {
    const [isLoading, setLoading] = useState(false);

    function downloadPictures() {
        setLoading(true);
        fetch('http://localhost:8000/api/downloadPhotos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ images: items })
        })
        .then(response => response.blob())
        .then(blob => {
            setLoading(false);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'images.zip';
            link.click();
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="cart-container">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Photos to Download</Offcanvas.Title>
                <div className="clear-cart-btn-container">
                    <Button variant="danger" onClick={clearCart}>Clear</Button>
                    <Button variant="success" onClick={downloadPictures}>Download</Button>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Downloading...</span>
                        </Spinner>
                    </div>
                ) : items.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    items.map(item => (
                        <div key={item.src} className="cart-item">
                            <img src={item.src} alt={item.alt} className="cart-image" />
                            <Button 
                                variant="outline-danger" 
                                onClick={() => removeFromCart(item.src)}
                                className="remove-item-btn"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </div>
                    ))
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;
