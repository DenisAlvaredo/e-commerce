import React, { useState } from 'react';

const TitleFilter = ({ onFilter }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onFilter(newTitle);
  };

  return (
    <form>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
      </label>
    </form>
  );
};

export default TitleFilter;
