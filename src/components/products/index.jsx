import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    const { addToCart } = useContext(CartContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectCategory = searchParams.get('category');

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

        handleFilter('https://api.escuelajs.co/api/v1/products/', params, setFilteredProducts);
    };

    console.log(selectCategory)
    console.log(priceMinFilter)
    console.log(priceMaxFilter)
    
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
            <h1 className='prod-title'>Products</h1>


            {isAdmin && (
                <Link to={'/admin/products/create'}>Create product</Link>
            )}
            <div className='prod-items'>
                <div className='prod-cards'>
                    {filteredProducts.map((prod) =>
                        <div key={prod.id} className='prod-card' >
                            <Link to={`/products/${prod.id}`} className='prod-link'>
                                <img src={prod.images} alt="" className='prod-card-img' />
                                <h3 className='prod-card-title'>{prod.title}</h3>
                                <p className='prod-card-info'>Price: ${prod.price}</p>
                                <p className='prod-card-info'>Category: {prod.category.name}</p>
                            </Link>
                            <button className='prod-buttons' onClick={() => handleAddToCart(prod)}>Add to Cart</button>
                            {isAdmin && (
                                <>
                                    <button className='prod-buttons'><Link to={`/admin/products/${prod.id}/edit`}>Edit</Link></button>
                                    <DeleteProduct id={prod.id}/>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className='prod-filters'>
                    <TitleFilter onFilter={handleTitleFilter} />
                    <RangePriceFilter onFilter={handlePriceRangeFilter} />
                    <CategoriesFilter categories={categories} onFilter={handleCategoryChange} />
                </div>
            </div>

        </div>
    )
}

export default Products;