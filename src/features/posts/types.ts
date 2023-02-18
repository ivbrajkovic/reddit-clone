export enum Tab {
  Post = "Post",
  ImageAndVideo = "Image & Video",
  Link = "Link",
  Poll = "Poll",
  Talk = "Talk",
}

type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  commentCount: number;
  voteStatus: number;
  createdAt: Timestamp;
  imageUrl: string | null;
  communityImageUrl: string | null;
};

export type PostVote = {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

export type PostState = {
  isLoadingPost: boolean;
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
};
