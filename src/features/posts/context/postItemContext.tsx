import { PostItemProps } from "@/features/posts/components/PostItem/PostItem";
import { createContext } from "react";

type PostItemContext = PostItemProps;

export const postItemContext = createContext({} as PostItemContext);
