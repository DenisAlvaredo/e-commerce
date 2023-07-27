import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

const DeleteCategory = ({ id }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteCategoryMutation = useMutation(
        () =>
            fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar la categoría');
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

    const handleDeleteCategory = async () => {
        try {
            await deleteCategoryMutation.mutateAsync();
        } catch (error) {
            console.error(error);
            alert('Error deleting category.');
        }
    };

    const confirmDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            handleDeleteCategory();
        }
    };

    return (
        <div>
            <h3>Delete Category</h3>
            <button onClick={confirmDelete}>Delete</button>
        </div>
    );
};

export default DeleteCategory;
