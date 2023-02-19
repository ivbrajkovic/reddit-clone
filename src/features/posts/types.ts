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

export type PostVotes = {
  votes: {
    [key: string]: PostVote;
  };
  lookUpVoteIdByPostId: {
    [key: string]: string;
  };
};

export type PostState = {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVotes;
};
