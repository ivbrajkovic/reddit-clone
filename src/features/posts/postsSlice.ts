import { Post, PostState } from "@/features/posts/types";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPostState: PostState = {
  selectedPost: null,
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setSelectedPost, setPosts } = postSlice.actions;

export const selectSelectedPost = (state: RootState) =>
  state.postSlice.selectedPost;

export const selectPosts = (state: RootState) => state.postSlice.posts;

export default postSlice.reducer;
