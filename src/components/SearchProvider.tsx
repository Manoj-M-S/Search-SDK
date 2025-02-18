import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  results: any[];
  queryText: string;
  loading: boolean;
  error: string | null;
  search: (query: string, page?: number) => void;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  apiKey: string;
  resourceId: string;
  children: ReactNode;
  // Optionally, allow configuration of pageSize
  pageSize?: number;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
  apiKey,
  resourceId,
  children,
  pageSize = 10
}) => {
  const [results, setResults] = useState<any[]>([]);
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // Add total results state

  const search = async (query: string, page: number = 1) => {
    if (!apiKey || !resourceId) {
      setError("API Key and Resource ID are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setQueryText(query);
    setCurrentPage(page);

    const baseUrl = "http://3.7.36.230:8282/v1/search";
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          query,
          index: resourceId,
          page: { results_per_page: pageSize, current_page: page },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Search failed");
      }

      setResults(data.results);
      // Update pagination states from page object
      setCurrentPage(data.page?.current_page ?? 1);
      setTotalPages(data.page?.total_pages ?? 1);
      setTotalResults(data.page?.total_results ?? 0);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to change page for the current query
  const goToPage = (page: number) => {
    if (queryText.trim()) {
      search(queryText, page);
    }
  };

  return (
    <SearchContext.Provider value={{ results, queryText, loading, error, search, currentPage, totalPages, goToPage }}>
      {children}
    </SearchContext.Provider>
  );
};
