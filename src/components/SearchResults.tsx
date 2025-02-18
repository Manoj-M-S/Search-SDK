// src/components/SearchResults.js
import React from 'react';
import { useSearchContext } from './SearchProvider';
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

const SearchResults: React.FC<SearchResultsProps> = ({
  containerClass = "search-component search-hits",
  hitItemClass = "hit-item",
  hitTitleClass = "hit-title",
  hitDescriptionClass = "hit-description",
  hitScoreClass = "hit-score",
  noResultsText = "No results found",
  loadingComponent,
  errorComponent,
  renderHit,
}) => {
  const { results, queryText, loading, error } = useSearchContext();

  const defaultHighlightMatch = (text: string, query: string): string => {
    if (!text || !query) return text;
    const words = query.toLowerCase().split(/\s+/);
    let highlighted = text;
    words.forEach((word) => {
      if (word.length > 2) {
        const regex = new RegExp(`(${word})`, "gi");
        highlighted = highlighted.replace(regex, '<span class="highlight">$1</span>');
      }
    });
    return highlighted;
  };

  if (loading) {
    return (
      <div className={containerClass}>
        {loadingComponent ? loadingComponent : (
          <div className="search-loading">
            <div className="search-spinner"></div>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClass}>
        {errorComponent ? errorComponent(error) : (
          <div className="search-error">{error}</div>
        )}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className={containerClass}>
        <div className="no-results">{noResultsText}</div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {results.map((hit: any, index: number) => {
        if (renderHit) {
          return (
            <div key={index} className={hitItemClass}>
              {renderHit(hit, queryText)}
            </div>
          );
        }
        return (
          <div key={index} className={hitItemClass}>
            {hit.metadata?.url ? (
              <a 
                href={hit.metadata.url} 
                className={hitTitleClass} 
                target="_blank" 
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: defaultHighlightMatch(hit.metadata?.title || "Untitled", queryText) }}
              />
            ) : (
              <div 
                className={hitTitleClass} 
                dangerouslySetInnerHTML={{ __html: defaultHighlightMatch(hit.metadata?.title || "Untitled", queryText) }}
              />
            )}
            <p 
              className={hitDescriptionClass} 
              dangerouslySetInnerHTML={{ __html: defaultHighlightMatch(hit.content, queryText) }} 
            />
            {hit.score ? (
              <div className={hitScoreClass}>Relevance: {(hit.score * 100).toFixed(1)}%</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
