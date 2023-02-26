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
        <>
            <h3 className="mb-3 mt-2">Productos</h3>
            {products.map((product) => {
                const { _id, name, price, expiry_date } = product;
                return (
                    <div className="mb-3 border rounded p-3" key={_id}>
                        <div className="d-flex justify-content-between mb-1">
                            <div className="fw-bold">{name}</div>
                            <div className="text-muted small">
                                <FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2" onClick={() => deleteProduct(_id)} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <small>Costo: {price}</small>
                            </div>
                            <div>
                                <small>Fecha de caducidad: {new Date(expiry_date).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ListProduct;
