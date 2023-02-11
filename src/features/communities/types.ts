import { Timestamp } from "firebase/firestore";

type PrivacyType = "public" | "private" | "restricted";

export type CreateCommunityFormValues = {
  communityName: string;
  privacyType: PrivacyType;
  adultContent: boolean;
};

export type Community = {
  communityId: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: PrivacyType;
  createdAt: Timestamp | null;
  imageUrl: string | null;
};

export type WithCommunityId = Pick<Community, "communityId">;

export type CommunitySnippet = {
  communityId: string;
  isModerator?: boolean;
  imageUrl: string | null;
};

export type CommunityState = {
  isCreateCommunityModalOpen: boolean;
  isUserJoinedInCurrentCommunity: boolean;
  isLoadingSnippets: boolean;
  communitySnippets: CommunitySnippet[];
  communityData: Community;
};
