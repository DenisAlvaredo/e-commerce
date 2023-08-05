import { useState } from "react";

const CategoryFilter = ({ categories, onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event) => {
        const newSelectedCategory = event.target.value;
        setSelectedCategory(newSelectedCategory);
        onFilter(newSelectedCategory);
    };

    return (
        <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value=''>All Categories</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default CategoryFilter;
