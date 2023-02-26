import React, { useEffect } from "react";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Componente que muestra la lista de productos
const ListProduct = ({ products, setProducts }) => {

    // Función para eliminar un producto por ID
    const deleteProduct = (id) => {
        axios.delete(`https://reactmongo-production.up.railway.app/api/product/${id}`)
            .then(() => {
                setProducts(products.filter((product) => product._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Hook useEffect para actualizar la lista de productos cada 1 segundo
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("https://reactmongo-production.up.railway.app/api/list")
                .then(({ data }) => {
                    setProducts(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);

        return () => clearInterval(interval);
    }, [setProducts]);

    // Renderiza la lista de productos
    return (
        <ul className="list-group">
            <li className="list-group-item active text-center fs-4">Lista de productos</li>
            {products.map((product) => {
                const { _id, name, price, expiry_date } = product;
                return (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={_id}>
                        <div>
                            <h5 className="mb-0">{name}</h5>
                            <div className="text-muted small">Fecha de caducidad: {new Date(expiry_date).toLocaleDateString()}</div>
                        </div>
                        <div>
                            <span className="badge bg-primary rounded-pill">Costo: {price}</span>
                            <button className="btn btn-danger ms-2" onClick={() => deleteProduct(_id)}>Eliminar</button>
                        </div>
                    </li>
                );
            })}
        </ul>

    );
};

export default ListProduct;
