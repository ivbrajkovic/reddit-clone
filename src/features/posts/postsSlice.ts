import { Post, PostState, PostVote } from "@/features/posts/types";
import { RootState } from "@/store/store";
import { RequiredByKeys } from "@/types";
import { isPostVote } from "@/utility";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find, ifElse, pipe, propEq, when } from "ramda";

const findPost = (postId: string) => (posts: Post[]) =>
  posts.find(propEq("id", postId));

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
    deletePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    updatePostById: (
      state,
      action: PayloadAction<RequiredByKeys<Partial<Post>, "id">>,
    ) => {
      const post = state.posts.find((post) => post.id === action.payload.id);
      if (post) Object.assign(post, action.payload);
    },

    setPostVoteByPostId: (state, action: PayloadAction<PostVote>) => {
      const { postId, voteValue } = action.payload;

      const appendPostValue = () => state.postVotes.push(action.payload);
      const updatePostValue = (postVote: PostVote) =>
        (postVote.voteValue += voteValue);

      pipe(
        find(propEq("postId", postId)),
        ifElse(isPostVote, updatePostValue, appendPostValue),
      )(state.postVotes);
    },
    updatePostVoteByPostId: (state, action: PayloadAction<PostVote>) => {
      const { postId, voteValue } = action.payload;

      const updatePostValue = (postVote: PostVote) =>
        (postVote.voteValue = voteValue);

      pipe(
        find(propEq("postId", postId)),
        when(isPostVote, updatePostValue),
      )(state.postVotes);
    },
  },
});

export const {
  toggleIsLoadingPost,
  setSelectedPost,
  setPosts,
  deletePost,
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
