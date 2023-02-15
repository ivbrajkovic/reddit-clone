import { debounce } from "@/utility/debounce";
import { useEffect, useState } from "react";

type Fn<A extends any[]> = (...args: A) => void;

/**
 * Debounce callback hook
 * @param fn Function to be debounced
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export const useDebounceCallback = <A extends any[]>(
  fn: Fn<A>,
  delay = 200,
): Fn<A> => {
  const [[debounced, cancel]] = useState(() => debounce(fn, delay));
  useEffect(() => cancel, [cancel]);
  return debounced;
};
