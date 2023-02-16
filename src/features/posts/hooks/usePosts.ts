import { selectPosts } from "@/features/posts/postsSlice";
import { useSelector } from "react-redux";

export const usePosts = () => useSelector(selectPosts);
