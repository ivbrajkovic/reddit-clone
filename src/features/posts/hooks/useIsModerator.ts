import { useUser } from "@/features/auth/hooks/useSignedInUser";

export const useIsCreator = (creatorId?: string) => {
  const user = useUser();
  return !!creatorId && user?.uid === creatorId;
};
