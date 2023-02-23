import { useEffect, useRef } from "react";

export const useRenderCount = (title: string) => {
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
    console.log(`${title} render count: ${count.current}`);
  });
  useEffect(() => {
    return () => {
      console.log(`${title} unmounted`);
    };
  }, [title]);
};
