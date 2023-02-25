import { useMemo } from "react";
import { uniqId } from "src/utils";

export const useUniqueKey = (array: number | Array<any> = []) => {
  const uniqueKeys = useMemo(
    () =>
      (typeof array === "number" ? Array(array) : array).map((_) => uniqId()),
    [array]
  );
  return uniqueKeys;
};
