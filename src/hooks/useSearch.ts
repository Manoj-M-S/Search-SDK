// src/hooks/useSearch.js
import { useSearchContext } from '../components/SearchProvider';

interface UseSearchReturn {
  results: any[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

const useSearch = (): UseSearchReturn => {
  const { results, loading, error, search } = useSearchContext();
  return { results, loading, error, search };
};

export default useSearch;

