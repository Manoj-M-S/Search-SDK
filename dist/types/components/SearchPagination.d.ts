import React from 'react';
export interface SearchPaginationProps {
    containerClass?: string;
    buttonClass?: string;
    activeButtonClass?: string;
    renderPagination?: (props: {
        currentPage: number;
        totalPages: number;
        goToPage: (page: number) => void;
        defaultPagination: React.ReactNode;
    }) => React.ReactNode;
}
declare const SearchPagination: React.FC<SearchPaginationProps>;
export default SearchPagination;
