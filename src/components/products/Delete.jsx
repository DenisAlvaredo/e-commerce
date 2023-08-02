import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

const DeleteProduct = ({ id }) => {
    const queryClient = useQueryClient();

    const deleteProductMutation = useMutation(
        () =>
            fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error deleting product');
                }
                return response.json();
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
            },
        }
    );

    const handleDeleteProduct = async () => {
        try {
            await deleteProductMutation.mutateAsync();

            console.log('Producto eliminado');
        } catch (error) {
            console.error(error);
            alert('Error deleting product.');
        }
    };

    const confirmDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            handleDeleteProduct();
        }
    };

    return (
        <div>
            <h2>Delete Product</h2>
            <button onClick={confirmDelete}>Delete</button>
        </div>
    );
};

export default DeleteProduct;
