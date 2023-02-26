import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://reactmongo-production.up.railway.app/api/list");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center mb-4">Tienda Adrisher</h1>
        <Row>
          <Col md={6}>
            <ProductForm />
          </Col>
          <Col md={6}>
          <div className="d-flex align-items-center mb-3">
          </div>
          <ProductList products={products} />
        </Col>
        </Row> 
      </Container>
    </>
  );
}

export default App;
