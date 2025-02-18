// src/components/SearchBox.js
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useSearchContext } from './SearchProvider';

export interface SearchBoxProps {
  placeholder?: string;
  buttonText?: string;
  containerClass?: string;
  inputWrapperClass?: string;
  inputClass?: string;
  buttonClass?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  buttonText = "Search",
  containerClass = "search-component search-box",
  inputWrapperClass = "search-input-wrapper",
  inputClass = "search-box-input",
  buttonClass = "search-submit-btn"
}) => {
  const [query, setQuery] = useState('');
  const { search } = useSearchContext();

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      search(query);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={containerClass}>
      <div className={inputWrapperClass}>
        <input
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          className={inputClass}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <button className={buttonClass} onClick={handleSearch}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
