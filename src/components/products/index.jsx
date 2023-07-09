import React from 'react';
import './styles.css'

const Products = ({ products = [] }) => {
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