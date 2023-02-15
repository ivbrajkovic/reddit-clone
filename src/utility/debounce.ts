type Fn<A extends any[]> = (...args: A) => void;
type Timeout = ReturnType<typeof setTimeout>;

/**
 * Debounces a function
 * @param fn Function to be debounced
 * @param delay Delay in milliseconds (default: 200)
 * @returns Debounced function and cancel function
 */
export const debounce = <A extends any[]>(fn: Fn<A>, delay = 200) => {
  let timeoutId: Timeout;
  const cancel = () => clearTimeout(timeoutId);
  const debounced = (...args: A) => {
    cancel();
    timeoutId = setTimeout(() => fn(...args), delay);
  };
  return [debounced, cancel] as const;
};
