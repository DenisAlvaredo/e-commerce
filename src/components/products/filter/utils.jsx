export const handleFilter = (url, params, setFilteredProducts) => {
    let filterTimeout;

    clearTimeout(filterTimeout);
    
    filterTimeout = setTimeout(() => {
        fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => setFilteredProducts(data));
    }, 500);
    
};