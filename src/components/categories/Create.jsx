import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const CreateCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        image: '',
    });

    const queryClient = useQueryClient();

    const createCategoryMutation = useMutation(
        (newCategory) =>
            fetch('https://api.escuelajs.co/api/v1/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error al crear la categoría');
                }
                return response.json();
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
            },
        }
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCategoryMutation.mutateAsync(categoryData);
            
            setCategoryData({
                name: '',
                description: '',
                image: '',
            });
        } catch (error) {
            console.error(error);
            alert('Error creating category.');
        }
    };

    return (
        <div>
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={categoryData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={categoryData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={categoryData.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateCategory;
