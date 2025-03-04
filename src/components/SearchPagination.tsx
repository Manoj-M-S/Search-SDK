import React from "react";
import { useSearchContext } from "./SearchProvider";
import DefaultPreviousIcon from "../assets/PreviousIcon.png";
import DefaultNextIcon from "../assets/NextIcon.png";

export interface SearchPaginationProps {
  // Optional prop for custom pagination rendering
  renderPagination?: (props: {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    defaultPagination: React.ReactNode;
  }) => React.ReactNode;
  // Style customization props
  containerClass?: string;
  paginationClass?: string;
  buttonClass?: string;
  pageInfoClass?: string;
  dividerClass?: string;
  previousIconClass?: string;
  nextIconClass?: string;
  // Custom icon props
  previousIcon?: string | any;
  nextIcon?: string | any;
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  renderPagination,
  containerClass = "",
  paginationClass = "",
  buttonClass = "",
  pageInfoClass = "",
  dividerClass = "",
  previousIconClass = "",
  nextIconClass = "",
  previousIcon,
  nextIcon,
}) => {
  const { currentPage, totalPages, goToPage } = useSearchContext();

  if (totalPages <= 1) return null;

  // Render previous icon
  const renderPreviousIcon = () => {
    if (previousIcon) {
      if (React.isValidElement(previousIcon)) {
        return React.cloneElement<any>(previousIcon, {
          className: previousIconClass,
          width: 20,
          height: 20
        });
      }
      // Handle both imported images and URLs
      const iconSrc = typeof previousIcon === 'string' ? 
        previousIcon : 
        previousIcon.src || previousIcon;
      
      return (
        <img 
          src={iconSrc}
          alt="Previous" 
          width="20" 
          height="20" 
          className={previousIconClass}
        />
      );
    }
    
    return (
      <img 
        src={DefaultPreviousIcon}
        alt="Previous" 
        width="20" 
        height="20" 
        className={previousIconClass}
      />
    );
  };

  // Render next icon
  const renderNextIcon = () => {
    if (nextIcon) {
      if (React.isValidElement(nextIcon)) {
        return React.cloneElement<any>(nextIcon, {
          className: nextIconClass,
          width: 20,
          height: 20
        });
      }
      // Handle both imported images and URLs
      const iconSrc = typeof nextIcon === 'string' ? 
        nextIcon : 
        nextIcon.src || nextIcon;

      return (
        <img 
          src={iconSrc}
          alt="Next" 
          width="20" 
          height="20" 
          className={nextIconClass}
        />
      );
    }
    
    return (
      <img 
        src={DefaultNextIcon}
        alt="Next" 
        width="20" 
        height="20" 
        className={nextIconClass}
      />
    );
  };

  const defaultPagination = (
    <div className={`pagination-container ${containerClass}`}>
      <div className={`divider ${dividerClass}`} />
      <div className={`pagination ${paginationClass}`}>
        <button
          className={`pagination-button ${buttonClass}`}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {renderPreviousIcon()}
        </button>

        <div className={`page-info ${pageInfoClass}`}>
          Page {currentPage} of {totalPages}
        </div>

        <button
          className={`pagination-button ${buttonClass}`}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {renderNextIcon()}
        </button>
      </div>
    </div>
  );

  // If a custom render function is provided, use that
  if (renderPagination) {
    return renderPagination({
      currentPage,
      totalPages,
      goToPage,
      defaultPagination,
    });
  }

  return defaultPagination;
};

export default SearchPagination;
