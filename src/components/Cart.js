import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const Cart = ({ show, handleClose }) => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    if (show) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch('https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/cart');
          if (!response.ok) {
            throw new Error('Failed to load cart items');
          }
          const data = await response.json();
          setCartItems(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCartItems();
    }
  }, [show]); // Reload cart items when the modal is shown

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/cart/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }
      // Remove item from state
      setCartItems(cartItems.filter(item => item.dataId !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.name} - Size({item.size}) - ${item.price} - Quantity: {item.quantity}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end"
                  onClick={() => handleDelete(item.dataId)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ListGroup>
        <div className="mt-3">
          <strong>Total Amount: ${getTotalAmount()}</strong>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
