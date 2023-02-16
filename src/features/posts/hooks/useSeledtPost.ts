import { useEventCallback } from "@/hooks/useEventCallback";

export const useSelectPost = (postId: string) => {
  return useEventCallback(() => {
    console.log("onSelectedPost", postId);
  });
};
