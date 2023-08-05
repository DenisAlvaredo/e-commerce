import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loading from '../screens/Loading';
import Error from '../screens/Error';

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        title: '',
        price: 0,
        description: '',
        category: '',
        images: '',
    });

    const queryClient = useQueryClient();

    const fetchCategories = async () => {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }
        return response.json();
    };

    const { data: categories, isLoading, isError } = useQuery('categories', fetchCategories);

    const createProductMutation = useMutation(
        (newProduct) =>
            fetch('https://api.escuelajs.co/api/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error al crear el producto');
                }
                return response.json();
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
                
                setProductData({
                    title: '',
                    price: 0,
                    description: '',
                    category: '',
                    images: '',
                });
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

        if (!productData.category || isNaN(productData.category)) {
            alert('Please select a valid category.');
            return;
        }

        try {
            await createProductMutation.mutateAsync(productData);
        } catch (error) {
            console.error(error);
            alert('Error creating product.');
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <div>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={productData.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" value={productData.category} onChange={handleInputChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Image URLs:</label>
                    <input
                        type="text"
                        name="images"
                        value={productData.images}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProduct;
