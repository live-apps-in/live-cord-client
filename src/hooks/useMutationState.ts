import {
  useMutation,
  UseMutationOptions,
  QueryKey,
  UseMutationResult,
} from "react-query";

interface UseMutationQueryResult<TData = unknown>
  extends Omit<UseMutationResult<TData>, "data" | "isLoading"> {
  foundError: any;
}

export function useMutationState<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): [TData, boolean, UseMutationQueryResult<TData>] {
  const { data, isLoading, ...otherOptions } = useMutation(options);

  const returnOptions = {
    ...otherOptions,
    foundError: otherOptions.isError ? otherOptions.error : null,
  };

  return [data, isLoading, returnOptions];
}
