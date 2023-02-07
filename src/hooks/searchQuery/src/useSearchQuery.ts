import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearQuery, updateQuery} from "@/store";

function useSearchQuery() {
  const searchQuery = useAppSelector(state => state.searchQuery.query);

  const dispatch = useAppDispatch();
  const updateSearchQuery = (query: string) => dispatch(updateQuery(query));
  const resetSearchQuery = () => dispatch(clearQuery());

  return {searchQuery, updateSearchQuery, resetSearchQuery};
}

export default useSearchQuery;
