import React from 'react';
import './styles.css'

const Categories = ({ categories = [] }) => {
    return(
        <div className='cat'>
            <h1>Categories</h1>
                <div className='cards'>
                    {categories.map((category) => (
                        <div key={category.id} className='card'>
                            <img src={category.image} alt="" className='card-img'/>
                            <h3 className='card-h3' >{category.name}</h3>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Categories;