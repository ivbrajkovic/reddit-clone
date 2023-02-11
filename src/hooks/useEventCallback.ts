import { useCallback, useEffect, useRef } from "react";

type Fn<A extends any[], R> = (...args: A) => R;

export function useEventCallback<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  const callbackRef = useRef(fn);

  useEffect(() => {
    callbackRef.current = fn;
  });

  return useCallback(
    (...args: A) => callbackRef.current && callbackRef.current(...args),
    [],
  );
}
