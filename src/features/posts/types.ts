import { Timestamp } from "firebase/firestore";

export enum Tab {
  Post = "Post",
  ImageAndVideo = "Image & Video",
  Link = "Link",
  Poll = "Poll",
  Talk = "Talk",
}

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  commentsCount: number;
  voteStatus: number;
  createdAt: Timestamp;
  imageUrl: string | null;
  communityImageUrl: string | null;
};

export type PostState = {
  selectedPost: Post | null;
  posts: Post[];
};
