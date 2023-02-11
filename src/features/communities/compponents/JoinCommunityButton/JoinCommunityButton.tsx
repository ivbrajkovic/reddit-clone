import { useCommunity } from "@/features/communities/hooks/useCommunity";
import { Button, ButtonProps } from "@mantine/core";
import { FC } from "react";

type JoinCommunityButtonProps = ButtonProps;

const JoinCommunityButton: FC<JoinCommunityButtonProps> = (props) => {
  const { isLoadingSnippets, isUserJoinedInCommunity, joinOrLeaveCommunity } =
    useCommunity();

  return (
    <Button
      {...props}
      loading={isLoadingSnippets}
      variant={isUserJoinedInCommunity ? "outline" : "filled"}
      onClick={joinOrLeaveCommunity}
    >
      {isUserJoinedInCommunity ? "Joined" : "Join"}
    </Button>
  );
};
export default JoinCommunityButton;
