import { Timestamp } from "firebase/firestore";

type PrivacyType = "public" | "private" | "restricted";

export type CreateCommunityFormValues = {
  communityName: string;
  privacyType: PrivacyType;
  adultContent: boolean;
};

export type Community = {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: PrivacyType;
  createdAt?: Timestamp;
  imageUrl?: string;
};
