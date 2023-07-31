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
            <h1>Categories</h1>
            {isAdmin && (
                <Link to={'admin/categories/create'}>Create category</Link>
            )}
                <div className='cards'>
                    {categories.map((category) => (
                        <div key={category.id} className='card'>
                            <img src={category.image} alt="" className='card-img'/>
                            <h3 className='card-h3' >{category.name}</h3>
                            {isAdmin && (
                                <>
                                    <button><Link to={`admin/categories/${category.id}/edit`} >Edit</Link></button>
                                    <DeleteCategory id={category.id}/>
                                </>
                            )}
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Categories;