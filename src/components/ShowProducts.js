import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/products"
        );
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const quantityHandler = async (productId, size) => {
    const productIndex = products.findIndex((product) => product.dataId === productId);
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex] };
      if (updatedProduct.quantities[size] > 0) {
        updatedProduct.quantities[size] -= 1;

        try {
          const response = await fetch(
            `https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/products/${productId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedProduct),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update product");
          }

          // Update state
          const updatedProducts = [...products];
          updatedProducts[productIndex] = updatedProduct;
          setProducts(updatedProducts);

          //Adding to Cart Making "POST" request

          const cartItem = {
            productId,
            size,
            quantity: 1,
            name:updatedProduct.name,
            price:updatedProduct.price,
          }

          const cartResponse = await fetch("https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/cart",
            {
              method:"POST",
              headers:{
                "Content-Type" : "application/json",
              },
              body:JSON.stringify(cartItem),
            }
          );
          if(!cartResponse.ok){
            throw new Error("Failed to add to cart");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Out of stock");
      }
    }
  };

  return (
    <Container>
      <h2>Your Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.dataId} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Subtitle>Price: ${product.price}</Card.Subtitle>
                <Button variant="primary" className="m-1" onClick={() => quantityHandler(product.dataId, 'S')}>
                  Buy Small ({product.quantities.S})
                </Button>
                <Button variant="primary" className="m-1" onClick={() => quantityHandler(product.dataId, 'L')}>
                  Buy Large ({product.quantities.L})
                </Button>
                <Button variant="primary" className="m-1" onClick={() => quantityHandler(product.dataId, 'XL')}>
                  Buy Extra Large ({product.quantities.XL})
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShowProducts;
