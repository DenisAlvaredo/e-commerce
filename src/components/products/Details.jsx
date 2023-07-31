import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const ProductDetails = () => {
    const { id } = useParams();

    const fetchProductDetails = async (id) => {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del producto');
        }
        const data = await response.json();
        return data;
    };


    const { data: product, isLoading, isError, error } = useQuery(['product', id], () => fetchProductDetails(id));

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    if (!product) {
        return <p>No se encontró el producto.</p>;
    }

    return (
        <div>
            <h2>Product Details</h2>
            <p>ID: {product.id}</p>
            <p>Title: {product.title}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category.name}</p>
            <img src={product.image} alt={product.title} />
        </div>
    );
};

export default ProductDetails;
