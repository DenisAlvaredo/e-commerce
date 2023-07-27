import React, { useState } from 'react';

const PriceFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
    onFilter(newMinPrice, maxPrice); // Llama a la función de filtro de rango en el componente padre (Products)
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
    onFilter(minPrice, newMaxPrice);
  };

  return (
    <form>
      <label>
        Min Price:
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Enter min price"
        />
      </label>
      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Enter max price"
        />
      </label>
    </form>
  );
};

export default PriceFilter;
