import React from 'react';
import { useSearchContext } from './SearchProvider';

export interface SearchPaginationProps {
  containerClass?: string;
  buttonClass?: string;
  activeButtonClass?: string;
  // Optional prop for custom pagination rendering
  // We also pass along the default pagination markup so users can reuse it
  renderPagination?: (props: {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    defaultPagination: React.ReactNode;
  }) => React.ReactNode;
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  containerClass = "search-pagination",
  buttonClass = "pagination-btn",
  activeButtonClass = "active-pagination-btn",
  renderPagination,
}) => {
  const { currentPage, totalPages, goToPage } = useSearchContext();

  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const defaultPagination = (
    <div className={containerClass}>
      {currentPage > 1 && (
        <button className={buttonClass} onClick={() => goToPage(currentPage - 1)}>
          Previous
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? activeButtonClass : buttonClass}
          onClick={() => goToPage(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className={buttonClass} onClick={() => goToPage(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );

  // If a custom render function is provided, use that
  if (renderPagination) {
    return renderPagination({ currentPage, totalPages, goToPage, defaultPagination });
  }

  return defaultPagination;
};

export default SearchPagination;