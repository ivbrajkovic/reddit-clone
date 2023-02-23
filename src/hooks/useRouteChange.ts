import { useRouter } from "next/router";
import { useEffect } from "react";

declare type Handler = (...evts: any[]) => void;

export const useRouteChanged = (fn: Handler) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", fn);
    return () => {
      router.events.off("routeChangeComplete", fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
