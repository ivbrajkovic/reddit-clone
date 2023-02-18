import { Post, PostVote } from "@/features/posts/types";

export const isPostVote = (value: any): value is PostVote =>
  value !== null &&
  typeof value === "object" &&
  "id" in value &&
  "postId" in value &&
  "communityId" in value &&
  "voteValue" in value;

export const isPost = (value: any): value is Post =>
  value !== null &&
  typeof value === "object" &&
  "id" in value &&
  "communityId" in value &&
  "creatorId" in value &&
  "creatorDisplayName" in value &&
  "title" in value &&
  "body" in value &&
  "commentCount" in value &&
  "voteStatus" in value &&
  "createdAt" in value &&
  "imageUrl" in value &&
  "communityImageUrl" in value;
