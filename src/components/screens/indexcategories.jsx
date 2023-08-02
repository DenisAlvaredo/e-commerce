import { useQuery } from 'react-query';
import Categories from "../categories";
import Loading from "./Loading";
import Error from "./Error";
import "./styles.css"

function IndexCategories() {
    const categoriesUrl = "https://api.escuelajs.co/api/v1/categories";

    const fetchCategories = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("ERROR HTTP: " + response.status);
        }
        return response.json();
    }

    const { data: categories, isLoading, isError } = useQuery('categories', () =>
        fetchCategories(categoriesUrl)
    );
    
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <div className="container">
            <Categories categories={categories} />
        </div>
    );
}

export default IndexCategories;
