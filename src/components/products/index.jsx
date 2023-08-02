import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleFilter } from './filter/utils';
import { useContext } from 'react';
import { AuthContext } from '../user/AuthContext';
import { CartContext } from '../cart/CartContext';
import TitleFilter from './filter/TitleFilter';
import CategoriesFilter from './filter/CategoryFilter';
import RangePriceFilter from './filter/RangePriceFilter';
import DeleteProduct from './Delete'
import './styles.css';

const Products = ({ products = [], categories = [] }) => {
    const { isAdmin } =  useContext(AuthContext);
    const { addToCart } = useContext(CartContext)

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [titleFilter, setTitleFilter] = useState('');
    const [priceMinFilter, setPriceMinFilter] = useState('');
    const [priceMaxFilter, setPriceMaxFilter] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const applyFilters = () => {
        let params = '';

        if (titleFilter) {
            params += `title=${titleFilter}&`;
        }

        if (priceMinFilter && priceMaxFilter) {
            params += `price_min=${priceMinFilter}&price_max=${priceMaxFilter}&`;
        }

        if (selectedCategory) {
            params += `categoryId=${selectedCategory}&`;
        }

        params = params ? params.slice(0, -1) : '';

        handleFilter('https://api.escuelajs.co/api/v1/products', params, setFilteredProducts);
    };

    const handleTitleFilter = (title) => {
        setTitleFilter(title);
        applyFilters();
    };

    const handlePriceRangeFilter = (min, max) => {
        setPriceMinFilter(min);
        setPriceMaxFilter(max);
        applyFilters();
    };

    const handleCategoryChange = (event) => {
        const newSelectedCategory = event.target.value;
        setSelectedCategory(newSelectedCategory);
        applyFilters();
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    
    return(
        <div className='prod'>
            <h1>Products</h1>

            <TitleFilter onFilter={handleTitleFilter} />
            <RangePriceFilter onFilter={handlePriceRangeFilter} />
            <CategoriesFilter categories={categories} onFilter={handleCategoryChange} />

            {isAdmin && (
                <Link to={'admin/products/create'}>Create product</Link>
            )}

            <div className='cards'>
                {filteredProducts.map((prod) =>
                    <div key={prod.id} className='card' >
                        <Link to={`/products/${prod.id}`}>
                            <img src={prod.images} alt="" className='card-img' />
                            <h3>{prod.title}</h3>
                            <p>Price: ${prod.price}</p>
                            <p>Category: {prod.category.name}</p>
                        </Link>
                        <button onClick={() => handleAddToCart(prod)}>Add to Cart</button>
                        {isAdmin && (
                            <>
                                <button><Link to={`admin/products/${prod.id}/edit`}>Edit</Link></button>
                                <DeleteProduct id={prod.id}/>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products;