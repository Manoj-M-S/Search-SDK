interface UseSearchReturn {
    results: any[];
    loading: boolean;
    error: string | null;
    search: (query: string) => void;
}
declare const useSearch: () => UseSearchReturn;
export default useSearch;
