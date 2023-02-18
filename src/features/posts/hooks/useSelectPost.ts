import { useEventCallback } from "@/hooks/useEventCallback";

export const useSelectPost = () => {
  return useEventCallback((postId: string) => {
    console.log("onSelectedPost", postId);
  });
};
