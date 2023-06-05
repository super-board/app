import {useCallback} from "react";

import {useFocusEffect} from "@react-navigation/core";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

export default function useRefetchQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  const useQueryReturn = useQuery(queryKey, queryFn, options);

  useFocusEffect(
    useCallback(() => {
      const refetchOnWindowFocus = options?.refetchOnWindowFocus ?? true;
      const enabled = options?.enabled ?? true;
      if (refetchOnWindowFocus && enabled) useQueryReturn.refetch();
    }, [options?.enabled, options?.refetchOnWindowFocus]),
  );

  return useQueryReturn;
}
