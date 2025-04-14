import React from "react";
import { useSearchContext } from "./SearchProvider";
import "../styles.css";

export interface SearchResultsProps {
  noResultsText?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: string) => React.ReactNode;
  renderHit?: (hit: any, queryText: string) => React.ReactNode;
  // Added style customization props
  containerClass?: string;
  resultCardClass?: string;
  resultTitleClass?: string;
  resultDescriptionClass?: string;
  resultMetaClass?: string;
  noResultsClass?: string;
  loadingClass?: string;
  errorClass?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  noResultsText = "No results found",
  loadingComponent,
  errorComponent,
  renderHit,
  // Default to empty strings for custom classes
  containerClass = "",
  resultCardClass = "",
  resultTitleClass = "",
  resultDescriptionClass = "",
  resultMetaClass = "",
  noResultsClass = "",
  loadingClass = "",
  errorClass = "",
}) => {
  const { results, queryText, loading, error } = useSearchContext();

  const defaultHighlightMatch = (text: string, query: string): string => {
    if (!text || !query) return text;
    const words = query.toLowerCase().split(/\s+/);
    let highlighted = text;
    words.forEach((word) => {
      if (word.length > 2) {
        const regex = new RegExp(`(${word})`, "gi");
        highlighted = highlighted.replace(
          regex,
          '<span class="highlight">$1</span>'
        );
      }
    });
    return highlighted;
  };

  // Always show loading state when loading is true
  if (loading) {
    return (
      <div className="search-loading-container">
        {loadingComponent ? (
          loadingComponent
        ) : (
          <div className={`search-loading ${loadingClass}`}>
            <div className="search-spinner"></div>
            <div className="loading-text">Loading results...</div>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {errorComponent ? (
          errorComponent(error)
        ) : (
          <div className={`search-error ${errorClass}`}>{error}</div>
        )}
      </div>
    );
  }

  // Only show "No results found" if a search has been performed (queryText exists)
  if (queryText && (!results || results.length === 0)) {
    return (
      <div>
        <div className={`no-results ${noResultsClass}`}>{noResultsText}</div>
      </div>
    );
  }

  // If no search has been performed yet, don't show anything
  if (!queryText) {
    return null;
  }

  return (
    <div className={`search-results-container ${containerClass}`}>
      {results.map((hit: any, index: number) => {
        if (renderHit) {
          return (
            <React.Fragment key={index}>
              {renderHit(hit, queryText)}
            </React.Fragment>
          );
        }
        return (
          <div className={`search-result-card ${resultCardClass}`} key={index}>
            <div className="card-container">
              {hit.image ? (
                <div className="card-content-with-image">
                  <div className="card-text-content">
                    <h2 className={`card-title ${resultTitleClass}`}>{hit.title}</h2>
                    <p className={`card-description ${resultDescriptionClass}`}>{hit.content}</p>
                  </div>
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${hit.image})` }}
                  ></div>
                </div>
              ) : (
                <div className="card-content">
                  <h2 className={`card-title ${resultTitleClass}`}>{hit.title}</h2>
                  <p className={`card-description ${resultDescriptionClass}`}>{hit.content}</p>
                </div>
              )}
              <div className={`card-meta ${resultMetaClass}`}>
                <span className="card-meta-item">
                  Relevance: {(hit.score * 100).toFixed(1)}%
                </span>
                <span className="card-meta-item">
                  Published on: {hit.publishedDate ?? "Published Date"}
                </span>
                <span className="card-meta-item">
                  {hit.type ?? "Document"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
