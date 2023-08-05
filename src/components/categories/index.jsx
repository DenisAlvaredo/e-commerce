import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../user/AuthContext';
import React from 'react';
import DeleteCategory from './Delete';
import './styles.css'

const Categories = ({ categories = [] }) => {
    const { isAdmin } =  useContext(AuthContext);

    return(
        <div className='cat'>
            <h1 className='cat-title'>Categories</h1>
            {isAdmin && (
                <Link to={'/admin/categories/create'}>Create category</Link>
            )}
                <div className='cat-cards'>
                    {categories.map((category) => (
                        <Link key={category.id} className='cat-card' to={`/products?category=${category.id}`}>
                            <img src={category.image} alt="" className='cat-card-img'/>
                            <h3 className='cat-card-h3' >{category.name}</h3>
                            {isAdmin && (
                                <>
                                    <button><Link to={`/admin/categories/${category.id}/edit`} >Edit</Link></button>
                                    <DeleteCategory id={category.id}/>
                                </>
                            )}
                        </Link>
                    ))}
                </div>
        </div>
    )
}

export default Categories;