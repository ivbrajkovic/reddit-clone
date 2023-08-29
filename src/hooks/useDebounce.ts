import { useEffect, useState } from "react";

/**
 * Debounce hook
 * @param value value to debounce
 * @param delay delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
