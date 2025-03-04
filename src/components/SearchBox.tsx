import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { useSearchContext } from "./SearchProvider";
import DefaultSearchIcon from "../assets/SearchIcon.png";

export interface SearchBoxProps {
  placeholder?: string;
  buttonText?: string;
  // Added style customization props
  containerClass?: string;
  inputWrapperClass?: string;
  inputClass?: string;
  buttonClass?: string;
  searchIconClass?: string;
  searchIconSrc?: string | any;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  buttonText = "Search",
  // Default to empty strings for custom classes
  containerClass = "",
  inputWrapperClass = "",
  inputClass = "",
  buttonClass = "",
  searchIconClass = "",
  searchIconSrc
}) => {
  const [query, setQuery] = useState("");
  const { search } = useSearchContext();

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      search(query);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const renderIcon = () => {
    if (!searchIconSrc) {
      return <img src={DefaultSearchIcon} alt="Search" width="20" height="20" className={`search-icon ${searchIconClass}`} />;
    }
    
    if (React.isValidElement(searchIconSrc)) {
      const elementType = typeof searchIconSrc.type === 'string' ? searchIconSrc.type : 'svg';
      return React.cloneElement<any>(searchIconSrc, {
        className: `search-icon ${searchIconClass}`,
        width: 20,
        height: 20
      });
    }

    const iconSrc = typeof searchIconSrc === 'string' ? searchIconSrc : searchIconSrc.src || searchIconSrc;
    return (
      <img
        src={iconSrc}
        alt="Search"
        width="20"
        height="20"
        className={`search-icon ${searchIconClass}`}
      />
    );
  };

  return (
    <div className={`search-form ${containerClass}`}>
      <div className={`input-field ${inputWrapperClass}`}>
        <div className="input-wrapper">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={`search-input ${inputClass}`}
          />
        </div>
      </div>
      <button 
        type="submit" 
        className={`search-button ${buttonClass}`} 
        onClick={handleSearch}
      >
        <span className="button-text">{buttonText}</span>
        {renderIcon()}
      </button>
    </div>
  );
};

export default SearchBox;
