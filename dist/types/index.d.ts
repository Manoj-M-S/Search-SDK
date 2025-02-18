import React from 'react';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';
import { SearchProvider } from './components/SearchProvider';
import SearchPagination from './components/SearchPagination';
import './styles.css';
export { SearchBox, SearchResults, SearchProvider, SearchPagination };
export interface SearchProps {
    apiKey: string;
    resourceId: string;
    placeholder?: string;
    buttonText?: string;
    searchBoxProps?: Partial<React.ComponentProps<typeof SearchBox>>;
    searchResultsProps?: Partial<React.ComponentProps<typeof SearchResults>>;
    pageSize?: number;
}
declare const Search: React.FC<SearchProps>;
export default Search;
