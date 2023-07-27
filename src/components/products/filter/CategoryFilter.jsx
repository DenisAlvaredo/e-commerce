import React, { useState } from 'react';

const CategoriesFilter = ({ categories = [], onFilter }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
        onFilter(updatedCategories);
    };

    return (
        <div>
            <h2>Filter by Categories</h2>
            {categories.map((category) => (
                <label key={category.id}>
                    <input
                        type='checkbox'
                        value={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                    />
                {category.name}
                </label>
            ))}
        </div>
    );
};

export default CategoriesFilter;
