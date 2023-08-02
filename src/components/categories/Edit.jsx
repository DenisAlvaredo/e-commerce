import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

const EditCategory = ({ id }) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const [categoryData, setCategoryData] = useState({
        name: '',
    });

    const fetchCategory = async () => {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener la categoría');
        }
        return response.json();
    };

    useEffect(() => {
        const getCategory = async () => {
            try {
                const category = await fetchCategory();
                setCategoryData(category);
            } catch (error) {
                console.error(error);
                alert('Error getting category.');
            }
        };

        getCategory();
    }, [id]);

    const updateCategoryMutation = useMutation(
        (updatedCategory) =>
            fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la categoría');
                }
                return response.json();
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
                navigate('/');
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
            await updateCategoryMutation.mutateAsync(categoryData);
        } catch (error) {
            console.error(error);
            alert('Error updating category.');
        }
    };

    return (
        <div>
            <h2>Edit Category</h2>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditCategory;
