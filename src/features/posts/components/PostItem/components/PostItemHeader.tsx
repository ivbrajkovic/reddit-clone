import { CommunityLogo } from "@/components/CommunityLogo";
import { useIsCreator } from "@/features/posts/hooks/useIsModerator";
import { Post } from "@/features/posts/types";
import { Box, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import { FC } from "react";

type PostItemHeaderProps = { isShowCommunityName?: boolean; post: Post };

const PostItemHeader: FC<PostItemHeaderProps> = (props) => {
  const isModerator = useIsCreator(props.post.creatorId);
  const formatCreatedAt = dayjs(props.post.createdAt.seconds * 1000).fromNow();

  return (
    <Box>
      <Group mb={4} spacing="sm" fz="9pt">
        <CommunityLogo
          imageUrl={props.post.communityImageUrl}
          icon="FaReddit"
          iconColor={isModerator ? "lightcoral" : "lightblue"}
        />
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
