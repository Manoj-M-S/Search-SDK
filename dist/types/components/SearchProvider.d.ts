import React, { ReactNode } from 'react';
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
export declare const useSearchContext: () => SearchContextType;
interface SearchProviderProps {
    apiKey: string;
    resourceId: string;
    children: ReactNode;
    pageSize?: number;
}
export declare const SearchProvider: React.FC<SearchProviderProps>;
export {};
