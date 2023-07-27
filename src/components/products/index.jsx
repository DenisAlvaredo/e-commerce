import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleFilter } from './filter/utils';
import { useContext } from 'react';
import { AuthContext } from '../user/AuthContext';
import TitleFilter from './filter/TitleFilter';
import CategoriesFilter from './filter/CategoryFilter';
import RangePriceFilter from './filter/RangePriceFilter';
import DeleteProduct from './Delete'
import './styles.css';

const Products = ({ products = [], categories = [] }) => {
    const { isAdmin } =  useContext(AuthContext);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [titleFilter, setTitleFilter] = useState('');
    const [priceMinFilter, setPriceMinFilter] = useState('');
    const [priceMaxFilter, setPriceMaxFilter] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const applyFilters = () => {
        let params = '';

        if (titleFilter) {
        params += `title=${titleFilter}&`;
        }

        if (priceMinFilter && priceMaxFilter) {
        params += `price_min=${priceMinFilter}&price_max=${priceMaxFilter}&`;
        }

        if (selectedCategories.length > 0) {
        const categoryIds = selectedCategories.map((category) => category.id).join(',');
        params += `categories=${categoryIds}&`;
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

    const handleCategoryFilter = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
        applyFilters();
    };


    return(
        <div className='prod'>
            <h1>Products</h1>

            <TitleFilter onFilter={handleTitleFilter} />
            <RangePriceFilter onFilter={handlePriceRangeFilter} />
            <CategoriesFilter categories={categories} onFilter={handleCategoryFilter} />

            {isAdmin && (
                <Link to={'/products/create'}>Create product</Link>
            )}

            <div className='cards'>
                {products.map((prod) =>
                    <div key={prod.id} className='card' >
                        <img src={prod.images} alt="" className='card-img' />
                        <h3>{prod.title}</h3>
                        <p>Price: ${prod.price}</p>
                        <p>Desc:</p>
                        <p>{prod.description}</p>
                        <p>Category: {prod.category.name}</p>
                        {isAdmin && (
                            <>
                                <button><Link to={`/products/${prod.id}/edit`}>Edit</Link></button>
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