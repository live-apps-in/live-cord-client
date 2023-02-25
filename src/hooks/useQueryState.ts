import { useEffect, useState } from "react";
import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseQueryResult,
} from "react-query";

interface UseStateQueryResult<TData = unknown>
  extends Omit<UseQueryResult<TData>, "data" | "isLoading"> {
  foundError: any;
}

export function useQueryState<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): [TData, boolean, UseStateQueryResult<TData>] {
  const { data, isLoading, ...otherOptions } = useQuery(options);

  const returnOptions = {
    ...otherOptions,
    foundError:
      otherOptions.isError && !otherOptions.isFetching
        ? otherOptions.error
        : null,
  };

  return [data, isLoading, returnOptions];
}

export function useQueryWithDependencies<T = unknown>(
  callback: () => T,
  dependencies: any[]
) {
  const [data, setData] = useState<T>(undefined);

  useEffect(() => {
    (async () => {
      const fetchedData = await callback();
      setData(fetchedData);
    })();
  }, dependencies);

  return data;
}

// export function useQueryWithDependencyQueryKeys<T = unknown>(
//   callback: (unsubscribe?: () => void) => T,
//   dependencyQueryKeys: string[]
// ) {
//   const queryClient = useQueryClient();
//   const [data, setData] = useState<T>(undefined);
//   const observer = new QueryObserver(queryClient, {
//     queryKey: dependencyQueryKeys,
//   });
//   const unsubscribe = observer.subscribe(async () => {
//     const fetchedData = await callback(unsubscribe);
//     setData(fetchedData);
//   });

//   useEffect(() => {
//     return unsubscribe;
//   }, []);

//   return data;
// }

// export function useListenQueryKeys(queryKeys: string[]) {
//   const queryClient = useQueryClient();
//   const [data, setData] = useState(undefined);
//   const observer = new QueryObserver(queryClient, {
//     queryKey: queryKeys,
//   });
//   const unsubscribe = observer.subscribe((result) => {
//     setData(result.data);
//   });
//   useEffect(() => {
//     return unsubscribe;
//   }, []);

//   return data;
// }
