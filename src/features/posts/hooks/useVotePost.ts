import { useEventCallback } from "@/hooks/useEventCallback";

export const useVotePost = () => {
  return useEventCallback((value: number) => {
    console.log("onSelectedPost", value);

    if (newVite) {
      // Add vote (set to 1 or -1)
      // Create post vote document
    } else {
      if (removin) {
        // Remove vote (set to 0)
        // Delete post vote document
      } else {
        // Flip vote (set to -1 -> 1 or 1 -> -1) => add 2 or subtract 2
        // Update post vote document add 2 or subtract 2
      }
    }
  });
};
