import { Post, PostState, PostVote, PostVotes } from "@/features/posts/types";
import { RootState } from "@/store/store";
import { RequiredByKeys } from "@/types";
import { findById } from "@/utility";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPostVotes = {
  votes: {},
  lookUpVoteIdByPostId: {},
};

const initialPostState: PostState = {
  initialized: false,
  posts: [],
  postVotes: { ...initialPostVotes },
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  extraReducers: (builder) => {
    builder.addCase("auth/logout", (state) => {
      state.initialized = false;
      state.postVotes = { ...initialPostVotes };
    });
  },
  reducers: {
    addPost: (state, { payload }: PayloadAction<Post>) => {
      state.posts.push(payload);
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload; // Merge posts ?
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
    deletePost: (state, { payload }: PayloadAction<Post>) => {
      state.posts = state.posts.filter((post) => post.id !== payload.id);
    },
    updatePost: (
      state,
      { payload }: PayloadAction<RequiredByKeys<Partial<Post>, "id">>,
    ) => {
      const post = findById(payload.id, state.posts);
      post && Object.assign(post, payload);
    },

    // PostVote

    setPostVotes: (state, { payload }: PayloadAction<PostVotes>) => {
      state.postVotes = payload;
    },
    addPostVote: (state, { payload }: PayloadAction<PostVote>) => {
      state.postVotes.votes[payload.id] = payload;
      state.postVotes.lookUpVoteIdByPostId[payload.postId] = payload.id;
    },
    deletePostVote: (state, { payload }: PayloadAction<string>) => {
      const postVote = state.postVotes.votes[payload];
      if (!postVote) return;
      delete state.postVotes.lookUpVoteIdByPostId[postVote.postId];
      delete state.postVotes.votes[payload];
    },
    updatePostVote: (
      state,
      { payload }: PayloadAction<RequiredByKeys<Partial<PostVote>, "id">>,
    ) => {
      const postVote = state.postVotes.votes[payload.id];
      postVote && Object.assign(postVote, payload);
    },
  },
});

export const {
  addPost,
  setPosts,
  deletePost,
  updatePost,
  setPostVotes,
  addPostVote,
  deletePostVote,
  updatePostVote,
} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.postSlice.posts;

export const selectPostVotes = (state: RootState) => state.postSlice.postVotes;

export default postsSlice.reducer;
