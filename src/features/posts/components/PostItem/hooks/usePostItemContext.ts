import { postItemContext } from "@/features/posts/components/PostItem/context/postItemContext";
import { useContext } from "react";

export const usePostItemContext = () => {
  const context = useContext(postItemContext);
  if (!context)
    throw new Error(
      "usePostItemContext must be used within a PostItemProvider",
    );
  return useContext(postItemContext);
};
