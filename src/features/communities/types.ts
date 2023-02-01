export type CreateCommunityFormValues = {
  communityName: string;
  communityType: "public" | "private" | "restricted";
  adultContent: boolean;
};
