import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './css/Cart.css'

const Cart = ({ items, removeFromCart, clearCart, show, handleClose }) => {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Photos to Download</Offcanvas.Title>
                
                <div className="clear-cart-btn-container">
                    <Button variant="danger" onClick={clearCart}>Clear</Button>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {items.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>

                        {items.map(item => (
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
                        ))}

                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;
