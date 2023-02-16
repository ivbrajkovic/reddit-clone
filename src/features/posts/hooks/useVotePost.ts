import { useEventCallback } from "@/hooks/useEventCallback";

export const useVotePost = () => {
  return useEventCallback((value: number) => {
    console.log("onSelectedPost", value);
  });
};
