import { showNotificationError } from "@/common/showNotificationError";
import { Community } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { jsonParseStringify as parseCommunityData } from "@/utility";
import { doc, DocumentSnapshot } from "firebase/firestore";

const errorFetchingCommunityData = showNotificationError(
  "Error fetching community data",
);

const getCommunityRef = (communityId: string) =>
  doc(firestore, "communities", communityId);

const throwIfCommunityNotFound = <T extends DocumentSnapshot>(
  docSnap: T,
): T => {
  if (!docSnap.exists()) throw new Error("Community not found");
  return docSnap;
};

const formatCommunityData = (docSnap: DocumentSnapshot) =>
  ({ communityId: docSnap.id, ...docSnap.data() } as Community);

const fetchCommunity = {
  getCommunityRef,
  formatCommunityData,
  parseCommunityData,
  throwIfCommunityNotFound,
  errorFetchingCommunityData,
};

export default fetchCommunity;
