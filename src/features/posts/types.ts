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

export type Votes = Record<string, PostVote | undefined>;
export type LookUpVoteIdByPostId = Record<string, string>;

export type PostVotes = {
  votes: Votes;
  lookUpVoteIdByPostId: LookUpVoteIdByPostId;
};

export type PostState = {
  isPostsFetched: boolean;
  posts: Post[];
  postVotes: PostVotes;
  postComments: PostComment[];
};

export type PostComment = {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};
