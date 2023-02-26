import React, { useState } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const ProductForm = ({ setProducts }) => {
    const [product, setProduct] = useState({ name: '', price: '', expiry_date: '' });
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });

    const handleInputChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!product.name) {
            setFormMessage({ type: 'danger', text: 'Por favor ingrese un nombre' });
            return;
        }

        if (product.price <= 0) {
            setFormMessage({ type: 'danger', text: 'El precio debe ser mayor que 0' });
            return;
        }

        axios
            .post('https://reactmongo-production.up.railway.app/api/product', product)
            .then(({ data }) => {
                setProducts([...setProducts, data]);
                setFormMessage({ type: 'success', text: 'Producto agregado con éxito' });
                setProduct({ name: '', price: '', expiry_date: '' });
            })
            .catch((error) => {
                console.log(error);
                setFormMessage({ type: 'danger', text: 'Hubo un error al agregar el producto' });
            });
    };

    return (
        <div className="mb-3 border rounded p-3 mt-2">
            <form onSubmit={handleSubmit}>
                {formMessage.text && <Alert color={formMessage.type}>{formMessage.text}</Alert>}
                <FormGroup>
                    <Label for="name">Nombre Producto:</Label>
                    <Input type="text" name="name" id="name" value={product.name} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Precio:</Label>
                    <Input type="number" name="price" id="price" value={product.price} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="expiry_date">Fecha de caducidad:</Label>
                    <Input type="date" name="expiry_date" id="expiry_date" value={product.expiry_date} onChange={handleInputChange} />
                </FormGroup>
                <Button type="submit" color="danger" >
                    Agregar
                </Button>
            </form>
        </div>
    );
};

export default ProductForm;
