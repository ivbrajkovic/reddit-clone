import { Post, PostState } from "@/features/posts/types";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPostState: PostState = {
  isLoadingPost: false,
  selectedPost: null,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    toggleIsLoadingPost: (state) => {
      state.isLoadingPost = !state.isLoadingPost;
    },
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    // setPosts: {
    //   reducer: (state, action: PayloadAction<Post[]>) => {
    //     state.posts = action.payload;
    //   },
    //   prepare: (posts: Post[]) => ({
    //     payload: posts.map((post) => ({
    //       ...post,
    //       createdAt: post.createdAt.toJSON(),
    //     })),
    //   }),
    // },
    deletePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { toggleIsLoadingPost, setSelectedPost, setPosts, deletePost } =
  postsSlice.actions;

export const selectIsLoadingPost = (state: RootState) =>
  state.postSlice.isLoadingPost;

export const selectSelectedPost = (state: RootState) =>
  state.postSlice.selectedPost;

export const selectPosts = (state: RootState) => state.postSlice.posts;

export default postsSlice.reducer;
