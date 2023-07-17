import React, { useState, useEffect } from 'react';
import './styles.css'

const Products = ({ products = [] }) => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');

    useEffect(() => {
    // Aplicar los filtros en función de los valores actuales
        const filtered = products.filter((product) => {
            // Filtro por título
            if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            // Filtro por categoría
            if (categoryFilter && product.category.name !== categoryFilter) {
                return false;
            }
            // Filtro por rango de precios
            if (minPriceFilter && parseFloat(product.price) < parseFloat(minPriceFilter)) {
                return false;
            }
            if (maxPriceFilter && parseFloat(product.price) > parseFloat(maxPriceFilter)) {
                return false;
            }
            return true;
        });

            setFilteredProducts(filtered);
        }, [products, searchTerm, categoryFilter, priceFilter, minPriceFilter, maxPriceFilter]);

        const handleSearch = (event) => {
            setSearchTerm(event.target.value);
        };

        const handleCategoryFilter = (event) => {
            setCategoryFilter(event.target.value);
        };

        const handleMinPriceFilter = (event) => {
            setMinPriceFilter(event.target.value);
        };

        const handleMaxPriceFilter = (event) => {
            setMaxPriceFilter(event.target.value);
        };

    return(
        <div className='prod'>
            <h1>Products</h1>
            <div className='cards'>
                {products.map((prod) =>
                    <div key={prod.id} className='card' >
                        <img src={prod.images} alt="" className='card-img' />
                        <h3>{prod.title}</h3>
                        <p>Price: ${prod.price}</p>
                        <p>Desc:</p>
                        <p>{prod.description}</p>
                        <p>Category: {prod.category.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products;