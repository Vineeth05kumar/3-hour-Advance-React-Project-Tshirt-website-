import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantityS: "",
    quantityL: "",
    quantityXL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, quantityS, quantityL, quantityXL } =
      productData;
    const payload = {
      name,
      description,
      price,
      quantities: {
        S: quantityS,
        L: quantityL,
        XL: quantityXL,
      },
    };

    try {
      const response = await fetch(
        "https://testtestapi.vercel.app/e675a4c1989b4c22932fede6dbfc9228/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setProductData({
        name: "",
        description: "",
        price: "",
        quantityS: "",
        quantityL: "",
        quantityXL: "",
      });
      // Handle success (e.g., reset form, show success message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='mb-5'>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Tshirt Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Price
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Quantities
        </Form.Label>
        <Col sm="2">
          <Form.Control
            type="number"
            name="quantityS"
            value={productData.quantityS}
            onChange={handleChange}
            placeholder="S"
          />
        </Col>
        <Col sm="2">
          <Form.Control
            type="number"
            name="quantityL"
            value={productData.quantityL}
            onChange={handleChange}
            placeholder="L"
          />
        </Col>
        <Col sm="2">
          <Form.Control
            type="number"
            name="quantityXL"
            value={productData.quantityXL}
            onChange={handleChange}
            placeholder="XL"
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}
