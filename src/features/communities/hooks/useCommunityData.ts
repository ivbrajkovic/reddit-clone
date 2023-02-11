import { selectCommunityData } from "@/features/communities/communitySlice";
import { useSelector } from "react-redux";

export const useCommunityData = () => useSelector(selectCommunityData);
