import { Post, PostState, PostVote } from "@/features/posts/types";
import { RootState } from "@/store/store";
import { RequiredByKeys } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPostState: PostState = {
  isLoadingPost: false,
  selectedPost: null,
  posts: [],
  postVotes: [],
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
    deletePostById: (state, { payload }: PayloadAction<Post>) => {
      state.posts = state.posts.filter((post) => post.id !== payload.id);
    },
    updatePostById: (
      state,
      { payload }: PayloadAction<RequiredByKeys<Partial<Post>, "id">>,
    ) => {
      const post = state.posts.find((post) => post.id === payload.id);
      post && Object.assign(post, payload);
    },

    setPostVoteByPostId: (state, { payload }: PayloadAction<PostVote>) => {
      const { postId, voteValue } = payload;
      const postVote = state.postVotes.find((vote) => vote.postId === postId);
      postVote
        ? (postVote.voteValue = voteValue)
        : state.postVotes.push(payload);
    },
  },
});

export const {
  toggleIsLoadingPost,
  setSelectedPost,
  setPosts,
  deletePostById: deletePost,
  updatePostById,
  setPostVoteByPostId,
} = postsSlice.actions;

export const selectIsLoadingPost = (state: RootState) =>
  state.postSlice.isLoadingPost;

export const selectSelectedPost = (state: RootState) =>
  state.postSlice.selectedPost;

export const selectPosts = (state: RootState) => state.postSlice.posts;

export const selectPostVotes = (state: RootState) => state.postSlice.postVotes;

export default postsSlice.reducer;
