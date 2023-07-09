import { useEffect, useState } from "react";
import Products from "../products";
import "./styles.css";


function IndexProducts() {
    const [prod, setProd] = useState([])

    const productsUrl = "https://api.escuelajs.co/api/v1/products"
    
    const fetchProducts = (url) => {
        fetch(url)
            .then((response)=> {
            if(!response.ok) {
                throw new Error("ERROR HTTP: " + response.status)
            }
            return response.json();
            })
            .then((data) => {
                setProd(data);
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchProducts(productsUrl);
    }, []);

    if (prod.length === 0) {
        return <h1 className="loading" >Loading...</h1>
    }

    return(
        <div className="container">
            <Products products={prod} />
        </div>
    )
}

export default IndexProducts;