import { useCommunity } from "@/features/communities/hooks/useCommunity";
import { Button, ButtonProps } from "@mantine/core";
import { FC } from "react";

type CommunityJoinButtonProps = ButtonProps;

const CommunityJoinButton: FC<CommunityJoinButtonProps> = (props) => {
  const { isLoading, isUserJoinedInCommunity, joinOrLeaveCommunity } =
    useCommunity();

  return (
    <Button
      {...props}
      loading={isLoading}
      variant={isUserJoinedInCommunity ? "outline" : "filled"}
      onClick={joinOrLeaveCommunity}
    >
      {isUserJoinedInCommunity ? "Joined" : "Join"}
    </Button>
  );
};
export default CommunityJoinButton;
