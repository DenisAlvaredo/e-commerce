import { useQuery } from 'react-query';
import Products from "../products";
import Loading from "./Loading";
import Error from "./Error";
import "./styles.css"

function IndexProducts() {
    const productsUrl = "https://api.escuelajs.co/api/v1/products"
    
    const fetchProducts = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("ERROR HTTP: " + response.status);
        }
        return response.json();
    }

    const { data: products, isLoading, isError } = useQuery('products', () =>
        fetchProducts(productsUrl)
    );

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return(
        <div className="container">
            <Products products={products} />
        </div>
    )
}

export default IndexProducts;
