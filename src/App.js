import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://reactmongo-production.up.railway.app/api/list")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-6">
            <h1>Lista de productos</h1>
            <ProductList products={products} setProducts={setProducts} />
          </div>
          <div className="col-lg-6">
            <h1>Agregar producto</h1>
            <ProductForm setProducts={setProducts} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
