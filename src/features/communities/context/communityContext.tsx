import { selectCommunityData } from "@/features/communities/communitySlice";
import { Community } from "@/features/communities/types";
import { createContext, FC, useContext } from "react";
import { useSelector } from "react-redux";

const CommunityDataContext = createContext({} as Community);

type CommunityProviderProps = { children: React.ReactNode };
export const CommunityProvider: FC<CommunityProviderProps> = ({ children }) => {
  const communityData = useSelector(selectCommunityData);

  return (
    <CommunityDataContext.Provider value={communityData}>
      {children}
    </CommunityDataContext.Provider>
  );
};

export const useCommunityData = () => {
  const context = useContext(CommunityDataContext);
  if (!context)
    throw new Error("useCommunityData must be used within a CommunityProvider");
  return context;
};
