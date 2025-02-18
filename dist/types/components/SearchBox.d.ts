import React from 'react';
export interface SearchBoxProps {
    placeholder?: string;
    buttonText?: string;
    containerClass?: string;
    inputWrapperClass?: string;
    inputClass?: string;
    buttonClass?: string;
}
declare const SearchBox: React.FC<SearchBoxProps>;
export default SearchBox;
