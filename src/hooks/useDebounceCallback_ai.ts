import { useDebounce } from "@/hooks/useDebounce";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useCallback } from "react";

type Fn<A extends any[], R> = (...args: A) => R;

/**
 * Debounce callback hook
 * @param fn Function to be debounced
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export const useDebounceCallback = <A extends any[], R>(
  fn: Fn<A, R>,
  delay: number,
): Fn<A, R> => {
  const callback = useEventCallback(fn);
  const debouncedCallback = useDebounce(callback, delay);
  return useCallback(debouncedCallback, [debouncedCallback]);
};
