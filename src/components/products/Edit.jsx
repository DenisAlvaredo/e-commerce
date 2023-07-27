import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

const EditProduct = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState({
        title: '',
        price: 0,
    });

    const queryClient = useQueryClient();

    const fetchProduct = async () => {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching product');
        }
        return response.json();
    };

    useEffect(() => {
        
        fetchProduct()
            .then((product) => {
                setProductData({
                    title: product.title,
                    price: product.price,
                });
            })
            .catch((error) => {
                console.error(error);
                alert('Error fetching product.');
            });
    }, [id]);

    const updateProductMutation = useMutation(
        (updatedProduct) =>
            fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error updating product');
                }
                return response.json();
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
            },
        }
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateProductMutation.mutateAsync(productData);
        } catch (error) {
            console.error(error);
            alert('Error updating product.');
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={productData.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditProduct;
