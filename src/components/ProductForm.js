import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ProductForm = ({ products = [], setProducts = () => { } }) => {

    const [product, setProduct] = useState({ name: '', price: '', expiry_date: '' });
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, price, expiry_date } = product;

        // Validaciones
        if (!name || !price || !expiry_date) {
            setFormMessage({ type: 'danger', text: 'Por favor complete todos los campos' });
            return;
        }

        if (price <= 0) {
            setFormMessage({ type: 'danger', text: 'El precio debe ser mayor que 0' });
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        if (expiry_date < currentDate) {
            setFormMessage({ type: 'danger', text: 'La fecha de caducidad debe ser posterior a la fecha actual' });
            return;
        }

        try {
            const response = await axios.post("https://reactmongo-production.up.railway.app/api/product", product);
            setProducts([...products, response.data]);
            setProduct({ name: '', price: '', expiry_date: '' }); // establecer los valores de los campos del formulario en una cadena vacía
            setFormMessage({ type: 'success', text: 'Producto agregado con éxito' });
        } catch (error) {
            console.log(error);
            setFormMessage({ type: 'danger', text: `Hubo un error al agregar el producto: ${error.message}` });
        }
    };
    return (

        <form onSubmit={handleSubmit} className="p-3 border rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del producto</label>
                <input type="text" className="form-control" id="name" name='name' value={product.name} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input type="number" className="form-control" id="price" name='price' value={product.price} onChange={handleInputChange} min="0" step="0.01" required />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="expiry_date" className="form-label">Fecha de caducidad</label>
                <input type="date" className="form-control" id="expiry_date" name='expiry_date' value={product.expiry_date} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faPlusCircle} className="me-2" />Agregar producto</button>
            {formMessage.text && <Alert color={formMessage.type}>{formMessage.text}</Alert>}
        </form>

    );
};

export default ProductForm;

