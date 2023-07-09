import { useEffect, useState } from "react";
import Categories from "../categories";
import "./styles.css"

function IndexCategories() {
    const [categories, setCategories] = useState([]);

    const categoriesUrl = "https://api.escuelajs.co/api/v1/categories";

    const fetchCategories = (url) => {
        fetch(url)
            .then((response)=> {
            if (!response.ok) {
                throw new Error("ERROR HTTP: " + response.status)
            }
            return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchCategories(categoriesUrl);
    }, []);

    if (categories.length === 0) {
        return <h1 className="loading" >Loading...</h1>;
    }
    

    return (
        <div className="container">
            <Categories categories={categories} />
        </div>
    )
}

export default IndexCategories;