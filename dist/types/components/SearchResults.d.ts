import React from 'react';
import '../styles.css';
export interface SearchResultsProps {
    containerClass?: string;
    hitItemClass?: string;
    hitTitleClass?: string;
    hitDescriptionClass?: string;
    hitScoreClass?: string;
    noResultsText?: string;
    loadingComponent?: React.ReactNode;
    errorComponent?: (error: string) => React.ReactNode;
    renderHit?: (hit: any, queryText: string) => React.ReactNode;
}
declare const SearchResults: React.FC<SearchResultsProps>;
export default SearchResults;
