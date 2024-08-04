import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Cart from './Cart'; // Import the Cart component

const Header = () => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#002f6c' }}>
        <Container>
          <Navbar.Brand href="#home">Add and Sell T-shirts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav>
          <Button onClick={handleShowCart}>Cart</Button>
        </Nav>
      </Navbar>
      <Cart show={showCart} handleClose={handleCloseCart} />
    </>
  );
};

export default Header;
