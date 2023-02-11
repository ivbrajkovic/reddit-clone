import { Timestamp } from "firebase/firestore";

type PrivacyType = "public" | "private" | "restricted";

export type CreateCommunityFormValues = {
  communityName: string;
  privacyType: PrivacyType;
  adultContent: boolean;
};

export type Community = {
  adultContent: boolean;
  communityId: string;
  creatorId: string;
  membersCount: number;
  privacyType: PrivacyType;
  createdAt: Timestamp | null;
  imageUrl: string | null;
};

export type NewCommunity = Omit<Community, "communityId">;

export type CommunitySnippet = {
  communityId: string;
  isModerator: boolean;
  imageUrl: string | null;
};

export type CommunityState = {
  isCreateCommunityModalOpen: boolean;
  isLoadingSnippets: boolean;
  communitySnippets: CommunitySnippet[];
  communityData: Community;
};
