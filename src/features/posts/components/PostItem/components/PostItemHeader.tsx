import { CommunityLogo } from "@/components/CommunityLogo";
import { useIsCreator } from "@/features/posts/hooks/useIsModerator";
import { Post } from "@/features/posts/types";
import { stopPropagation } from "@/utility";
import { Box, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";

type PostItemHeaderProps = { isShowCommunityName?: boolean; post: Post };

const PostItemHeader: FC<PostItemHeaderProps> = (props) => {
  const isModerator = useIsCreator(props.post.creatorId);
  const formatCreatedAt = dayjs(props.post.createdAt.seconds * 1000).fromNow();

  const communityUrl = `/r/${props.post.communityId}`;

  return (
    <Box onClick={stopPropagation}>
      <Group mb={4} spacing="sm" fz="9pt" sx={{ cursor: "default" }}>
        {props.isShowCommunityName ? (
          <>
            <CommunityLogo
              imageUrl={props.post.communityImageUrl}
              icon="FaReddit"
              iconColor={isModerator ? "lightcoral" : "lightblue"}
            />
            <Text component={Link} href={communityUrl} fw="700">
              {communityUrl}
            </Text>
          </>
        ) : null}
        <Text>Posted by u/{props.post.creatorDisplayName}</Text>
        <Text>{formatCreatedAt}</Text>
      </Group>
      <Text mb={4} fz="12pt" fw={600}>
        {props.post.title}
      </Text>
    </Box>
  );
};

export default PostItemHeader;
