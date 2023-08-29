import { CommunityLogo } from "@/components/CommunityLogo";
import { useIsCreator } from "@/features/posts/hooks/useIsModerator";
import { Post } from "@/features/posts/types";
import { stopPropagation } from "@/utility";
import { Box, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";
import { BsDot } from "react-icons/bs";

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
            <Group spacing={0}>
              <Text
                component={Link}
                href={communityUrl}
                fw="700"
                sx={{ "&:hover": { textDecoration: "underline" } }}
              >
                {communityUrl}
              </Text>
              <BsDot fontSize={12} color="gray" />
              <Text mr="xs">Posted by u/{props.post.creatorDisplayName}</Text>
              <Text>{formatCreatedAt}</Text>
            </Group>
          </>
        ) : (
          <>
            <Text>Posted by u/{props.post.creatorDisplayName}</Text>
            <Text>{formatCreatedAt}</Text>
          </>
        )}
      </Group>
      <Text mb={4} fz="12pt" fw={600}>
        {props.post.title}
      </Text>
    </Box>
  );
};

export default PostItemHeader;
